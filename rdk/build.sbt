organization  := "com.zte.vmax"

version       := "2.3.16"

unmanagedBase := file("proc/bin/lib")

name          := "rdk-server"

scalaVersion  := "2.10.5"

scalacOptions := Seq("-feature","-unchecked", "-deprecation","-encoding", "utf8","-language:postfixOps","-language:implicitConversions")

javacOptions  := Seq("-encoding", "utf8")

//javaHome := Some(file("../../rdk-resource/jdk-win32"))  

//fork := true

libraryDependencies ++= {
  val akkaV = "2.3.5"
  val sprayV = "1.3.2"
  Seq(
	"io.spray"               %%  "spray-servlet"    % sprayV,
    "io.spray"               %%  "spray-routing"    % sprayV,
    "io.spray"               %%  "spray-httpx"      % sprayV,
    "io.spray"               %%  "spray-client"     % sprayV,
    "io.spray"               %%  "spray-testkit"    % sprayV    % "test",
    "com.typesafe.akka"      %%  "akka-actor"       % akkaV,
    "com.typesafe.akka"      %%  "akka-testkit"     % akkaV     % "test",
	"org.specs2"             %% "specs2-core"       % "2.3.7"   % "test",
    "org.scalatest"          %  "scalatest_2.10"    % "2.1.0"   % "test",
	"org.pegdown"            % "pegdown"            % "1.0.2" % "test",
    "org.json4s"             %%  "json4s-native"    % "3.2.4",
    "log4j"                  %   "log4j"            % "1.2.17",
    "com.google.code.gson"   %   "gson"             % "2.2.2",
	"javax.servlet"          % "javax.servlet-api"  % "3.0.1"   % "provided"
  )
}

jacoco.settings

parallelExecution in ThisBuild := false

parallelExecution in jacoco.Config := false

testOptions in jacoco.Config += Tests.Argument("-h","target/report")

testOptions in jacoco.Config += Tests.Argument("-o")

// delete all svn directories
postProcess in webapp := { webappDir => removeAllSvn(webappDir) }

// use jetty container
jetty(port = 9099)