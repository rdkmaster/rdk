package test

import java.io.{File, FilenameFilter}
import java.nio.file.attribute.BasicFileAttributes
import java.nio.file._

/**
  * Created by 10054860 on 2016/8/8.
  */
object WalkFileTree extends App {

  forEachDir(Paths.get("app"))

  def forEachDir(path: Path) = {
    if (path.toFile.isDirectory)
      Files.walkFileTree(path, new SimpleFileVisitor[Path] {
        override def preVisitDirectory(dir: Path, attributes: BasicFileAttributes) = {
          if (dir.endsWith("server")) {

            val initjs = dir.toFile.listFiles(new FilenameFilter {
              override def accept(dir: File, name: String): Boolean = name == "init.js"

            })
            initjs.foreach(it =>println(it.getAbsoluteFile) )

          }
          FileVisitResult.CONTINUE
        }
      })
  }
}
