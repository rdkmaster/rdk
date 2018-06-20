package com.zte.vmax.rdk.service

 /*
 * Created by 10054860 on 2016/11/2.
 */

import java.io.{File, RandomAccessFile}

import akka.actor._
import spray.can.Http
import spray.http.MediaTypes._
import spray.http.{ChunkedMessageEnd, ContentType, HttpEntity, MessageChunk}
import spray.httpx.marshalling.{Marshaller, MarshallingContext}
import spray.routing.RoutingSettings
import spray.routing.directives.FileAndResourceDirectives

import scala.math._


trait CustomMarshallers extends FileAndResourceDirectives {

  implicit def actorRefFactory: ActorRefFactory

  implicit def routeSettings: RoutingSettings

  implicit val CsvMarshaller =
    Marshaller.of[File](`application/octet-stream`) {
      (file: File, contentType: ContentType, ctx: MarshallingContext) =>

        actorRefFactory.actorOf {
          Props {
            new Actor with ActorLogging {
              val defaultChunkSize = min(routeSettings.fileChunkingChunkSize, routeSettings.fileChunkingThresholdSize).toInt

              private def getNumberOfChunks(file: File): Int = {
                val randomAccessFile = new RandomAccessFile(file, "r")
                try {
                  ceil(randomAccessFile.length.toDouble / defaultChunkSize).toInt
                } finally {
                  randomAccessFile.close
                }
              }

              private def readChunk(file: File, chunkIndex: Int): Array[Byte] = {
                val randomAccessFile = new RandomAccessFile(file, "r")
                val byteBuffer = new Array[Byte](defaultChunkSize)
                try {
                  val seek = chunkIndex * defaultChunkSize
                  randomAccessFile.seek(seek)
                  val nread = randomAccessFile.read(byteBuffer)
                  if (nread == -1) byteBuffer
                  else if (nread < byteBuffer.size) byteBuffer.take(nread)
                  else byteBuffer
                } finally {
                  randomAccessFile.close
                }
              }

              val chunkNum = getNumberOfChunks(file)

              val responder: ActorRef = ctx.startChunkedMessage(HttpEntity(contentType, ""), Some(Ok(0)))(self)

              sealed case class Ok(seq: Int)

              def stop() = {
                log.debug("Stopped CSV download handler actor.")
                responder ! ChunkedMessageEnd
                file.delete()
                context.stop(self)
              }

              def sendCSV(seq: Int) =
                if (seq < chunkNum)
                  responder ! MessageChunk(readChunk(file, seq)).withAck(Ok(seq + 1))
                else
                  stop()

              def receive = {
                case Ok(seq) =>
                  sendCSV(seq)
                case ev: Http.ConnectionClosed =>
                  log.debug("Stopping response streaming due to {}", ev)
              }
            }
          }
        }
    }
}
