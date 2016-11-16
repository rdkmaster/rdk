#include <GUIConstantsEx.au3>
#include <GuiEdit.au3>
#include <WindowsConstants.au3>
#include <Misc.au3>

#AutoIt3Wrapper_Icon=favicon.ico

#NoTrayIcon


Const $WIN_TITLE = 'RDK Server for Windows'

If _Singleton("rdk_console_for_windows", 1) = 0 Then
	_error('已经有一个控制台在运行了！')
	WinActivate($WIN_TITLE)
EndIf



Global $java
Global $httpPid = 0
Global $restPid = 0
Global $rdkPid = 0

Global $versionFetched = False

_init()

Global $width = 1000
Global $height = 600
Global $gui = GUICreate($WIN_TITLE, $width, $height, Default, Default, $WS_MAXIMIZEBOX + $WS_MINIMIZEBOX + $WS_SIZEBOX)

$width -= 4
$height -= 26
Global $tab = GUICtrlCreateTab(2, 2, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKLEFT+$GUI_DOCKTOP)

GUICtrlCreateTabItem("RDK")
Global $rdkConsole = GUICtrlCreateEdit("", 2, 23, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
GUICtrlSetFont(-1, 8.5, 0, 0, 'Courier New')
_GUICtrlEdit_SetLimitText($rdkConsole, 3000000000)

GUICtrlCreateTabItem("HTTP")
Global $httpConsole = GUICtrlCreateEdit("", 2, 23, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
GUICtrlSetFont(-1, 8.5, 0, 0, 'Courier New')
_GUICtrlEdit_SetLimitText($httpConsole, 3000000000)

GUICtrlCreateTabItem("Rest")
Global $restConsole = GUICtrlCreateEdit("", 2, 23, $width, $height)
GUICtrlSetResizing(-1, $GUI_DOCKBORDERS)
GUICtrlSetFont(-1, 8.5, 0, 0, 'Courier New')
_GUICtrlEdit_SetLimitText($restConsole, 3000000000)

GUICtrlCreateTabItem("About")
GUICtrlCreateLabel('欢迎使用 RDK Windows 开发环境', 12, 36, 400)
GUICtrlSetFont(-1, 12, $FW_BOLD)
GUICtrlSetResizing(-1, $GUI_DOCKALL)

Global $lbVersion = GUICtrlCreateLabel('○ 当前版本 ...', 24, 70, 140)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbDownload = GUICtrlCreateLabel ('下载最新版', 165, 69)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('○ 如何开始', 24, 90)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbGetStarted = GUICtrlCreateLabel ('http://10.9.233.35:8080/doc/#best_practise/index.md', 96, 89)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('○ RDK 官网', 24, 110)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbSite = GUICtrlCreateLabel ('http://10.9.233.35:8080', 96, 109)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('○ RDK 代码', 24, 130)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbGitlab = GUICtrlCreateLabel ('http://gitlab.zte.com.cn/10045812/rdk', 96, 129)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('○ 我有需求', 24, 150)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbIssue = GUICtrlCreateLabel ('http://gitlab.zte.com.cn/10045812/rdk/issues/new', 96, 149)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('○ 报告 Bug', 24, 170)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
Global $lbBug = GUICtrlCreateLabel ('http://gitlab.zte.com.cn/10045812/rdk/issues/new', 96, 169)
GUICtrlSetResizing(-1, $GUI_DOCKALL)
GuiCtrlSetFont(-1, 9, $FW_NORMAL, $GUI_FONTUNDER)
GuiCtrlSetColor(-1, 0x0000ff)
GuiCtrlSetCursor(-1, 0)

GUICtrlCreateLabel('○ 工作目录 ' & @ScriptDir, 24, 190)
GUICtrlSetResizing(-1, $GUI_DOCKALL)

GUICtrlCreateTabItem("") ; end tabitem definition

GUISetState(@SW_SHOW)

_startRDK()
_startHTTP()
_startRest()

AdlibRegister('_updateConsole', 100)
OnAutoItExitRegister('_beforeExit')

While 1
	Switch GUIGetMsg()
		Case $GUI_EVENT_CLOSE
			If MsgBox(292, "RDK Server for Windows", "是否关闭所有的服务进程并退出？", 0, $gui) == 6 Then Exit
		Case $lbGetStarted
			_visitWeb('http://10.9.233.35:8080/doc/#best_practise/index.md')
		Case $lbSite
			_visitWeb('http://10.9.233.35:8080')
		Case $lbGitlab
			_visitWeb('http://gitlab.zte.com.cn/10045812/rdk')
		Case $lbIssue
			_visitWeb('http://gitlab.zte.com.cn/10045812/rdk/issues/new')
		Case $lbBug
			_visitWeb('http://gitlab.zte.com.cn/10045812/rdk/issues/new')
		Case $lbDownload
			_visitWeb('http://10.9.233.35:8080/site/download/index.html')
		Case $tab
			If GUICtrlRead($tab) <> 3 Then ContinueLoop
			If $versionFetched Then ContinueLoop
			$versionFetched = True
			GUICtrlSetData($lbVersion, '○ 当前版本 ' & _getVersion())
	EndSwitch

WEnd

Func _updateConsole()
	_updateConsoleDo($rdkPid, $rdkConsole)
	_updateConsoleDo($httpPid, $httpConsole)
	_updateConsoleDo($restPid, $restConsole)
EndFunc

Func _updateConsoleDo($pid, $console)
	Local $out = StdoutRead($pid)
	If @extended > 0 Then
		$out = _fixConoleText($out)
		_GUICtrlEdit_AppendText($console, $out)
	EndIf
EndFunc

Func _fixConoleText($text)
	Return StringRegExpReplace(StringReplace($text, @LF, @CRLF), '\x1b\[\d+m', '')
EndFunc

Func _startHTTP()
	FileChangeDir(@ScriptDir & '\tools\http_server\')
	$httpPid = Run("node server.js", "", @SW_HIDE, $STDERR_MERGED)
EndFunc

Func _startRest()
	FileChangeDir(@ScriptDir & '\doc\tools\live_demo\mock_rest\')
	$restPid = Run("node rest_service.js", "", @SW_HIDE, $STDERR_MERGED)
EndFunc

Func _startRDK()
	Local $cmd = '"' & $java & '" ' & _readArg() & _
		' -Dfile.encoding=UTF-8 -XX:+UseParallelGC -XX:ParallelGCThreads=2 ' & _
		' -classpath proc/bin/lib/* com.zte.vmax.rdk.Run'

	FileChangeDir(@ScriptDir & '\rdk')
	$rdkPid = Run($cmd, @WorkingDir, @SW_HIDE, $STDOUT_CHILD)
EndFunc

Func _init()
	Local $pid = Run('node --version', @WorkingDir, @SW_HIDE)
	If $pid == 0 Then
		_error('请先安装nodejs的运行环境！' & @CRLF & @CRLF & _
				'下载地址： http://nodejs.cn/' & @CRLF & @CRLF & _
				'Ctrl+C 可复制链接。')
	EndIf

	$java = @WorkingDir & '\proc\bin\jre\bin\java.exe'
	If Not FileExists($java) Then $java = EnvGet ( "JAVA_HOME" ) & '\bin\java.exe'

	If Not FileExists($java) Then
		_error('找不到 Java1.8 运行环境。' & @CRLF & @CRLF & _
			'【解决方法】' & @CRLF & '请将 Java1.8 及以上的 Java 运行环境拷贝到这个目录：'  _
			& @WorkingDir & '\proc\bin\jre' & @CRLF & _
			'或者 正确配置 JAVA_HOME 环境变量的值。')
	EndIf

	ToolTip('正在检查 JRE 版本。。。', @DesktopWidth/2, @DesktopHeight/2-50, '', 0, 2)
	$pid = Run(@ComSpec & " /c " & '"' & $java & '" -version', "", @SW_HIDE, $STDERR_CHILD)
	ProcessWaitClose($pid)
	ToolTip('')
	Local $version = Number(StringMid(StderrRead($pid), 15, 3))
	If $version < 1.8 Then
		_error('当前 Java 运行环境版本(' & $version & ') 版本过低，至少需要 JRE1.8 以上的版本。')
	EndIf

	Local $jreOpt = ''
	If $cmdLine[0] > 0 Then
		For $i = 1 To $cmdLine[0]
			$jreOpt &= $cmdLine[$i] & ' '
		Next
	Else
		$jreOpt = InputBox("RDK for Windows", "输入 RDK 启动参数。" & @CRLF & _
				"如果不知道干啥用的，就使用默认值就行啦。", _readArg()," ","350","150")
		If @error == 1 Or @error == 3 Then Exit
	EndIf
	_saveArg($jreOpt)
EndFunc

Func _beforeExit()
	ToolTip('正在关闭后台进程，请稍候。。。', @DesktopWidth/2, @DesktopHeight/2-50, '', 0, 2)
	If $httpPid <> 0 Then ProcessClose($httpPid)
	If $restPid <> 0 Then ProcessClose($restPid)
	If $rdkPid <> 0 Then ProcessClose($rdkPid)
	ToolTip('')
EndFunc

Func _visitWeb($url)
	Run(@ComSpec & " /c " & 'start ' & $url, "", @SW_HIDE)
EndFunc

Func _getVersion()
	ConsoleWrite('get version...' & @CRLF)
	Local $buildFile = FileRead(@ScriptDir & '\rdk\build.sbt')
	Local $match = StringRegExp($buildFile, 'version\s*:=\s*"(.*)"', $STR_REGEXPARRAYGLOBALMATCH)
	Return @error ? 'unknown' : 'V' & $match[0]
EndFunc

Func _error($msg)
	MsgBox(16+4096, "出错啦！", $msg)
	Exit 0
EndFunc

Func _readArg()
	Local $arg = StringStripWS(FileRead(_getConfigFileName()), 3)
	Return $arg == '' ? '-Xms64m -Xmx256m' : $arg;
EndFunc

Func _saveArg($arg)
	Local $file = FileOpen(_getConfigFileName(), $FO_OVERWRITE)
	FileWrite($file, $arg)
EndFunc

Func _getConfigFileName()
	Return StringLeft(@ScriptFullPath, StringInStr(@ScriptFullPath, '.', 0, -1) - 1) & '.cfg'
EndFunc

