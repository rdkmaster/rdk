import sbt._
import java.io.File
import org.apache.commons.io.FileUtils

object VmaxDrsConfWebappBuild extends Build {

  def removeAllSvn(base: File): Unit = {
    for (x <- base.listFiles) {
      if (x.isDirectory) {
        if (x.getName == ".svn") FileUtils.deleteDirectory(x)
        else removeAllSvn(x)
      }
    }
  }

}