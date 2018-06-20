package com.zte.vmax.rdk.loader

import java.io.File
import java.net.{MalformedURLException, URLClassLoader}
import com.zte.vmax.rdk.defaults.Const
import com.zte.vmax.rdk.util.Logger

 /*
  * 专门用于加载所有rdk应用jdbc驱动的ClassLoader实例
  * Created by 10184092 on 2017/3/9.
  */


object JDBCDriverClassLoader extends URLClassLoader(Array.empty) with Logger {
  val file: File = new File(Const.jdbcDriversDir)

  for (f <- file.listFiles) {
    if (f.isFile && f.getAbsolutePath.toLowerCase.endsWith(".jar"))
      try {
        logger.debug("loading: " + f)
        super.addURL(f.toURI.toURL)
      }
      catch {
        case e: MalformedURLException => {
          logger.error(e.toString)
        }
      }
  }
}

