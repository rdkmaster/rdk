 echo off
 if "%1%" == "" (
  node ./libs/requirejs/r.js -o minimize.js paths.main=../../scripts/main
  ) else (
	node ./libs/requirejs/r.js -o minimize.js paths.main=%1%
 )
pause