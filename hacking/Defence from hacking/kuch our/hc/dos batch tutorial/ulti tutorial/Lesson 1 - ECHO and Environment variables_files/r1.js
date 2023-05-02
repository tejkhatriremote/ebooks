// Copyright Allen & Company 2005 - all rights reserved
if (Ln>=1) {s=Xc+"@</SPAN> (Prevent "+Xo+"(&#39;ECHO&#39;)'>ECHO</A> of a command line, see "+Xo+"(&#39;ECHO&#39;)'>ECHO</A>)";Cn["@"]=s}
if (Ln>=1) {s=Xc+"CLS</SPAN> (clears the display screen)<BR>"+Xh+Xi+"<BR><BR><SPAN CLASS=fx>cls</SPAN><BR><SPAN CLASS=lg>Clears the display.</SPAN>"+(Ln>=7?Xb+"<SPAN CLASS=fx>cls&#62;FILE.TXT</SPAN><BR><SPAN CLASS=lg>Display is not cleared, but file <SPAN CLASS=rfs>FILE.TXT</SPAN> is created and contains ANSI sequence for clearing display = <NOBR><SPAN CLASS=ky>&nbsp;Esc&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;[&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;2&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;J&nbsp;</SPAN></NOBR> (where <SPAN CLASS=ky>&nbsp;Esc&nbsp;</SPAN> is character ASCII=27).</SPAN>":"");Cn["CLS"]=s}
if (Ln>=1) {s=Xc+"current drive</SPAN> (the disk drive that Batch commands assume when no drive is explicitly specified)"+Xb+"<SPAN CLASS=fx>c:</SPAN><BR><SPAN CLASS=lg>Makes <SPAN CLASS=rfs>c:</SPAN> the <SPAN CLASS=ci>current drive</SPAN> (a drive letter plus <SPAN CLASS=ky>&nbsp;:&nbsp;</SPAN> is the command to make that drive current).</SPAN>"+Xb+"<SPAN CLASS=fx>a:</SPAN><BR><SPAN CLASS=lg>Makes <SPAN CLASS=rfs>a:</SPAN> the <SPAN CLASS=ci>current drive</SPAN>.</SPAN>"+Xb+"A separate "+Xo+"(&#39;current folder&#39;)'>current folder</A> is stored for each drive. "+(Ln>=7?"See also "+Xo+"(&#39;CD&#39;)'>CD</A>.":"");Cn["current drive"]=s}
if (Ln>=1) {s=Xc+"current folder</SPAN> (the folder that Batch commands assume when no folder is explicitly specified)"+Xb+"A separate <SPAN CLASS=ci>current folder</SPAN> is stored for each drive. See also "+(Ln>=7?Xo+"(&#39;CD&#39;)'>CD</A>, ":"")+Xo+"(&#39;current drive&#39;)'>current drive</A>.";Cn["current folder"]=s}
if (Ln>=1) {s=Xc+"ECHO</SPAN> (displays text or turns on/off command display)<BR>"+Xh+Xi+Xb+"<NOBR><SPAN CLASS=fx>ECHO. Some text</SPAN></NOBR><BR><SPAN CLASS=lg>Displays <SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN><SPAN CLASS=rfs>Some text</SPAN> to "+(Ln>=7?Xo+"(&#39;STDOUT&#39;)'>STDOUT</A>":"screen")+".</SPAN>"+(Ln>=7?Xb+"<NOBR><SPAN CLASS=fx>ECHO.Line of text&#62;TEXTFILE.TXT</SPAN></NOBR><BR><SPAN CLASS=lg>Creates file <SPAN CLASS=rfs>TEXTFILE.TXT</SPAN> containing <SPAN CLASS=rfs>Line of text</SPAN>, using "+Xo+"(&#39;redirection&#39;)'>redirection</A> of "+Xo+"(&#39;STDOUT&#39;)'>STDOUT</A>.</SPAN>":"")+Xb+"<SPAN CLASS=fx>ECHO.</SPAN><BR><SPAN CLASS=lg>Displays a blank line (<SPAN CLASS=rfs>echo</SPAN> on its own displays the current on/off status).</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>ECHO ON</SPAN></NOBR><BR><SPAN CLASS=lg>Turns on display of Batch file commands as they are executed.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>ECHO OFF</SPAN></NOBR><BR><SPAN CLASS=lg>Turns off display of Batch file commands.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>@ECHO OFF</SPAN></NOBR><BR><SPAN CLASS=lg>Turns off display of Batch file commands and isn&#39;t itself displayed. The <SPAN CLASS=rfs>@</SPAN> prefix turns off display of an individual command-line in a Batch file.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>ECHO Some text</SPAN></NOBR><BR><SPAN CLASS=lg>Displays <NOBR><SPAN CLASS=rfs>Some text</SPAN></NOBR> (first <SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN> after <SPAN CLASS=rfs>echo</SPAN> is <SPAN CLASS=br>not</SPAN> displayed). Eleven other suffixes are <SPAN CLASS=br>not</SPAN> displayed:<BR><SPAN CLASS=ky>&nbsp;Comma&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;;&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;=&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;:&nbsp;</SPAN> and <SPAN CLASS=ky>&nbsp;Period&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;/&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;&#92;&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;+&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;[&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;]&nbsp;</SPAN> <SPAN CLASS=ky>&nbsp;&#34;&nbsp;</SPAN>.<BR>Last seven stop effect of <SPAN CLASS=rfs>ON</SPAN>/<SPAN CLASS=rfs>OFF</SPAN> command.</SPAN>"+X2xp+"<SPAN CLASS=lg> There is no <SPAN CLASS=rfs>ON</SPAN>/<SPAN CLASS=rfs>OFF</SPAN> conflict, and the character <SPAN CLASS=ky>&nbsp;&#34;&nbsp;</SPAN> can&#39;t be used immediately after <SPAN CLASS=ci>ECHO</SPAN>.</SPAN>"+Xb+"<SPAN CLASS=fx>ECHO//?</SPAN><BR><SPAN CLASS=lg>Displays <SPAN CLASS=rfs>/?</SPAN> literally (only this <SPAN CLASS=ky>&nbsp;/&nbsp;</SPAN> suffix stops the <SPAN CLASS=fx>/?</SPAN> help appearing instead of literal <SPAN CLASS=rfs>/?</SPAN> in Win95/98/ME).</SPAN>";Cn["ECHO"]=s}
if (Ln>=1) {s=Xc+"External</SPAN> (command coded in separate program file)<BR><BR>An <SPAN CLASS=ci>External</SPAN> command, such as "+Xo+"(&#39;start&#39;)'>start</A>, is a command for which the program code is in one (or more) separate program files. These files are mostly stored in the <SPAN CLASS=rfs>C:&#92;WINDOWS&#92;COMMAND</SPAN> folder. <SPAN CLASS=ci>External</SPAN> commands need these separate program files for their execution. In this Course, by convention, we use <SPAN CLASS=br>lowercase</SPAN> for <SPAN CLASS=ci>External</SPAN> commands in Batch scripts."+(Ln>=2?"<BR><BR>Many <SPAN CLASS=ci>External</SPAN> commands set "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A>s.":"")+Xb+"See also "+Xo+"(&#39;Internal&#39;)'>Internal</A>."+Xstart;Cn["External"]=s}
if (Ln>=1) {s=Xc+"Internal</SPAN> (command coded in <SPAN CLASS=rfs>COMMAND.COM</SPAN>)<BR><BR>An <SPAN CLASS=ci>Internal</SPAN> command, such as "+Xo+"(&#39;ECHO&#39;)'>ECHO</A>, is a command for which the program code is in the Windows command-line Command Processor (which is the program file <SPAN CLASS=rfs>COMMAND.COM</SPAN>). <SPAN CLASS=ci>Internal</SPAN> commands do not therefore depend on separate program files for their execution. In this Course, by convention, we use <SPAN CLASS=br>UPPERCASE</SPAN> for <SPAN CLASS=ci>Internal</SPAN> commands in Batch scripts (we don&#39;t bother for examples typed at the prompt, in immediate mode)."+(Ln>=2?"<BR><BR><SPAN CLASS=ci>Internal</SPAN> commands do not set "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A>s in Windows 95/98/ME (but some <SPAN CLASS=ci>internal</SPAN> commands <SPAN CLASS=br>do</SPAN> set "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A>s in Windows NT/2000/XP).":"")+Xb+"See also "+Xo+"(&#39;External&#39;)'>External</A>."+Xcmd;Cn["Internal"]=s}
if (Ln>=1) {s=Xc+"PATH</SPAN> (two meanings, either: <B>command</B> to display or change system <SPAN CLASS=ci>PATH</SPAN>, or the <B>variable</B> that holds it)<BR>"+Xh+Xi+Xb+"The <SPAN CLASS=ci>PATH</SPAN> is the (semi-colon separated) list of folders searched for an executable file (=file with extension: <SPAN CLASS=rfs>COM</SPAN>, <SPAN CLASS=rfs>EXE</SPAN>, or <SPAN CLASS=rfs>BAT</SPAN>) if the file is not <SPAN CLASS=br>first</SPAN> found in the "+Xo+"(&#39;current folder&#39;)'>current folder</A>). The list is held in the same-name environment variable <SPAN CLASS=ci>PATH</SPAN>."+Xb+"<NOBR><SPAN CLASS=fx>path %path%;&#34;c:&#92;my src&#34;</SPAN></NOBR><BR><SPAN CLASS=lg><SPAN CLASS=br>Adds</SPAN> folder <NOBR><SPAN CLASS=rfs>c:&#92;my src</SPAN></NOBR> to current value of <SPAN CLASS=ci>PATH</SPAN>. Note: In Windows 95/98/ME the <SPAN CLASS=ci>PATH</SPAN> command changes any &#34;quoted&#34; long folder name to its short name alias when adding it to the <SPAN CLASS=ci>PATH</SPAN> in this way.<BR><SPAN CLASS=fa>&nbsp;NT/2000/XP&nbsp;</SPAN> The &#34;quoted&#34; folder name is added.</SPAN>"+Xb+"The default Windows 95/98/ME value of <SPAN CLASS=ci>PATH</SPAN> is: <NOBR><SPAN CLASS=rfs>C:&#92;WINDOWS<SPAN CLASS=og>;</SPAN>C:&#92;WINDOWS&#92;COMMAND</SPAN></NOBR>"+(Ln>=7?Xb+"See also "+(Ln>=20?Xo+"(&#39;CALL&#39;)'>CALL</A>, ":"")+Xo+"(&#39;relative path&#39;)'><NOBR>relative path</NOBR></A>.":"")+X2xp+" The list of executable extensions also includes <SPAN CLASS=rfs>.CMD</SPAN> scripts, and the normal <SPAN CLASS=ci>PATH</SPAN> includes <SPAN CLASS=rfs>C:&#92;WINDOWS<SPAN CLASS=og>;</SPAN>C:&#92;WINDOWS&#92;SYSTEM32</SPAN></NOBR>";Cn["PATH"]=s}
if (Ln>=1) {s=Xc+"SET</SPAN> (display, set, or clear environment variable)<BR>"+Xh+Xi+Xb+"<NOBR><SPAN CLASS=fx>SET MYVAR = Some text</SPAN></NOBR><BR><SPAN CLASS=lg>Normally a <SPAN CLASS=br>bad usage</SPAN>, because of <SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN>s either side of <SPAN CLASS=ky>&nbsp;=&nbsp;</SPAN>. Variable name created is <SPAN CLASS=rfs>MYVAR</SPAN><SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN>. Its contents will also <SPAN CLASS=br>start</SPAN> with a <SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN>.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>SET MYVAR=Some text</SPAN></NOBR><BR><SPAN CLASS=lg><SPAN CLASS=bg>Correct usage</SPAN> to load <SPAN CLASS=rfs>MYVAR</SPAN> with <NOBR><SPAN CLASS=rfs>Some text</SPAN></NOBR>.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>SET MYVAR=</SPAN></NOBR><BR><SPAN CLASS=lg>Ensures <SPAN CLASS=rfs>MYVAR</SPAN> is cleared (and no longer appears in the <SPAN CLASS=ci>SET</SPAN> listing). Be certain <SPAN CLASS=br>not</SPAN> to add any trailing <SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN>s or similar characters after the <SPAN CLASS=ky>&nbsp;=&nbsp;</SPAN>. If you do, <SPAN CLASS=rfs>MYVAR</SPAN> <SPAN CLASS=br>isn&#39;t</SPAN> cleared properly.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>ECHO. MYVAR=<SPAN CLASS=qfx>%MYVAR%</SPAN> (expand contents)</SPAN></NOBR><BR><SPAN CLASS=lg><SPAN CLASS=rfs>%MYVAR%</SPAN> expands current contents of <SPAN CLASS=rfs>MYVAR</SPAN> in a command line, just as if you had actually typed its current contents there.</SPAN>";Cn["SET"]=s}
if (Ln>=1) {s=Xc+"start</SPAN> (opens application or data file in new process)<BR>"+Xh+Xe+"(file=<SPAN CLASS=fs>START.EXE</SPAN>). "+Xnw+Xb+"<NOBR><SPAN CLASS=fx>start &#34;c:&#92;my docs&#92;AnyFile.htm&#34;</SPAN></NOBR><BR><SPAN CLASS=lg>Opens <NOBR><SPAN CLASS=rfs>c:&#92;my docs&#92;AnyFile.htm</SPAN></NOBR> in your default browser "+Xq+". In general, use <SPAN CLASS=ci>start</SPAN> <SPAN CLASS=rfs>DataFile</SPAN> to open <SPAN CLASS=rfs>DataFile</SPAN> in the application registered to handle it.</SPAN>"+(Ln>=2?Xb+"<NOBR><SPAN CLASS=fx>start /<SPAN CLASS=hr>w</SPAN> scandskw</SPAN></NOBR><BR><SPAN CLASS=lg>In a Batch file, opens <SPAN CLASS=rfs>scandskw</SPAN> (ScanDisk program) in a new process (=new window), <SPAN CLASS=br>w</SPAN>aits for that operation to complete, and only then continues. When <SPAN CLASS=rfs>/w</SPAN> is used, any "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A> set by a GUI process is returned to the parent Batch file.</SPAN>":"")+(Ln>=12?Xb+"<NOBR><SPAN CLASS=fx>start /<SPAN CLASS=or>w</SPAN> MyBatch.bat</SPAN></NOBR><BR><SPAN CLASS=lg>Runs <SPAN CLASS=rfs>MyBatch.bat</SPAN> in a new process, <SPAN CLASS=br>w</SPAN>aiting for it to finish. Places <B>full</B> short-name path to <SPAN CLASS=rfs>MyBatch.bat</SPAN> in the <NOBR><SPAN CLASS=fx>%0</SPAN></NOBR> parameter of <SPAN CLASS=rfs>MyBatch.bat</SPAN> (similar to double-clicking <SPAN CLASS=rfs>MyBatch.bat</SPAN> in <B>Explorer</B>).</SPAN>":"")+Xstart;Cn["start"]=s}
if (Ln>=2) {s=Xc+"choice</SPAN> (wait for chosen keypress from user)<BR>"+Xh+Xe+"(file=<SPAN CLASS=fs>CHOICE.COM</SPAN>)."+(Ln>=3?Xb+"<NOBR><SPAN CLASS=fx>choice /c:qyn</SPAN></NOBR><BR><SPAN CLASS=lg>Displays <NOBR><SPAN CLASS=rfs>[Y,N,Q]?</SPAN></NOBR>, waits for either: <SPAN CLASS=ky>&nbsp;Y&nbsp;</SPAN>, <SPAN CLASS=ky>&nbsp;N&nbsp;</SPAN> or <SPAN CLASS=ky>&nbsp;Q&nbsp;</SPAN>.<BR>Returns "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A> as position in <SPAN CLASS=rfs>/c:</SPAN> key list:<BR><SPAN CLASS=cir>1</SPAN>=(<SPAN CLASS=rfs>Q</SPAN> pressed) <SPAN CLASS=cir>2</SPAN>=(<SPAN CLASS=rfs>Y</SPAN> pressed) <SPAN CLASS=cir>3</SPAN>=(<SPAN CLASS=rfs>N</SPAN> pressed).</SPAN>":"")+(Ln>=10?Xb+"<NOBR><SPAN CLASS=fx>choice /c:<SPAN CLASS=op>q</SPAN>yn /t<SPAN CLASS=op>q</SPAN>,<SPAN CLASS=op>10</SPAN> &#34; Press Y, N, Q &#34;</SPAN></NOBR><BR><SPAN CLASS=lg>Displays message <NOBR><SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN><SPAN CLASS=rfs>Press Y, N, Q</SPAN><SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN></NOBR>, waits for user to press <SPAN CLASS=ky>&nbsp;Y&nbsp;</SPAN>, <SPAN CLASS=ky>&nbsp;N&nbsp;</SPAN> or <SPAN CLASS=ky>&nbsp;Q&nbsp;</SPAN>. After waiting <SPAN CLASS=bp>10</SPAN> seconds, it then (=<SPAN CLASS=rfs>/t</SPAN>)imes out, and defaults to <SPAN CLASS=ky>&nbsp;Q&nbsp;</SPAN>.<BR>Returns "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A> from order set in <SPAN CLASS=rfs>/c:</SPAN> key list:<BR><SPAN CLASS=cir>1</SPAN>=(<SPAN CLASS=bp>Q</SPAN> pressed/timeout) <SPAN CLASS=cir>2</SPAN>=(<SPAN CLASS=rfs>Y</SPAN> pressed) <SPAN CLASS=cir>3</SPAN>=(<SPAN CLASS=rfs>N</SPAN> pressed).</SPAN>":"")+(Ln>=10?Xb+"<NOBR><SPAN CLASS=fx>"+(Ln>=20?"REM &#124; ":"")+"choice /c:delay /td,15&#62;NUL</SPAN></NOBR><BR><SPAN CLASS=lg>(In Batch files) waits <SPAN CLASS=rfs>15</SPAN> seconds, then resumes with next line. Delay may range from from <B>1</B> - <B>99</B> seconds.</SPAN>":"")+(Ln>=10?Xb+"See also "+Xo+"(&#39;PAUSE&#39;)'>PAUSE</A>.":"");Cn["choice"]=s}
if (Ln>=2) {s=Xc+"command</SPAN> (open a new command shell)<BR>"+Xh+"Command Processor (file=<SPAN CLASS=fs>COMMAND.COM</SPAN>)."+Xb+"<NOBR><SPAN CLASS=fx>command /z /k PROMPT RCode $p$g</SPAN></NOBR><BR><SPAN CLASS=lg>Opens <B>Return-code</B> (<SPAN CLASS=rfs>/z</SPAN>) shell (all "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A> changes shown). Sets "+Xo+"(&#39;PROMPT&#39;)'>PROMPT</A> for new shell.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>command /c</SPAN></NOBR><BR><SPAN CLASS=lg>Opens and immediately closes child shell. Often used for its side effect of clearing "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A> to zero.</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>%COMSPEC% /c</SPAN></NOBR><BR><SPAN CLASS=lg>Same effect as previous example. The system variable <SPAN CLASS=fs>COMSPEC</SPAN> holds the full path to <SPAN CLASS=fs>COMMAND.COM</SPAN>, so it&#39;s often expanded and used in Batch files instead of the plain syntax: <SPAN CLASS=ci>command</SPAN></SPAN>."+Xb+"See also "+Xo+"(&#39;EXIT&#39;)'>EXIT</A>.";Cn["command"]=s}
if (Ln>=2) {s=Xc+"ERRORLEVEL</SPAN> (result code"+(Ln>=3?", for testing see "+Xo+"(&#39;IF&#39;)'>IF</A>":"")+")"+Xb+"This is a byte in memory that takes values from 0 to 255. Many "+Xo+"(&#39;External&#39;)'>External</A> commands return result codes as <SPAN CLASS=ci>ERRORLEVEL</SPAN>s."+Xb+"<NOBR><SPAN CLASS=fx>%COMSPEC% /c</SPAN></NOBR><BR><SPAN CLASS=lg>Clears current <SPAN CLASS=ci>ERRORLEVEL</SPAN> to zero.</SPAN>"+Xb+"See also "+(Ln>=3?Xo+"(&#39;IF&#39;)'>IF</A>, ":"")+Xo+"(&#39;command&#39;)'>command</A>.<BR><BR>Windows 95/98/ME <SPAN CLASS=bb>ERRORLEVEL</SPAN>s<BR><SPAN CLASS=lg>The /? help for "+Xo+"(&#39;External&#39;)'>External</A> commands doesn&#39;t list the <SPAN CLASS=bb>ERRORLEVEL</SPAN>s they return, but you can download our<IMG SRC=bca.gif><A HREF='../mcsw/errorlevels.zip'>Detailed List</A> of useful values for most Windows 95/98/ME commands (you&#39;ll need to be on-line).</SPAN>";Cn["ERRORLEVEL"]=s}
if (Ln>=2) {s=Xc+"EXIT</SPAN> (closes current shell)<BR>"+Xh+Xi+Xb+"<SPAN CLASS=fx>exit</SPAN><BR><SPAN CLASS=lg>Close current child shell. If the current shell is <SPAN CLASS=br>not</SPAN> a child shell, <SPAN CLASS=rfs>exit</SPAN> closes the current DVM window.</SPAN>"+Xb+"See also "+Xo+"(&#39;command&#39;)'>command</A>.";Cn["EXIT"]=s}
if (Ln>=2) {s=Xc+"PROMPT</SPAN> (changes the appearance of the <SPAN CLASS=ci>PROMPT</SPAN>)<BR>"+Xh+Xi+Xb+"The <SPAN CLASS=ci>PROMPT</SPAN> is the cue that shows Windows is ready to accept a command. The code for <SPAN CLASS=ci>PROMPT</SPAN> is held in same-name environment variable <SPAN CLASS=fs>PROMPT</SPAN>."+Xb+"<NOBR><SPAN CLASS=fx>PROMPT $p$g</SPAN></NOBR><BR><SPAN CLASS=lg>Sets the usual default <SPAN CLASS=ci>PROMPT</SPAN> (="+Xo+"(&#39;current drive&#39;)'>current drive</A> plus "+Xo+"(&#39;current folder&#39;)'>current folder</A>), plus a <SPAN CLASS=ky>&nbsp;&#62;&nbsp;</SPAN> character).</SPAN>"+Xb+"For meaning of <SPAN CLASS=ci>PROMPT</SPAN> codes see the <SPAN CLASS=fx>/?</SPAN> brief help.";Cn["PROMPT"]=s}
if (Ln>=3) {s=Xc+"IF</SPAN> (executes command if condition is true)<BR>"+Xh+Xi+Xaw+Xb+"<NOBR><SPAN CLASS=fx>IF ERRORLEVEL 3 ECHO. Three or more</SPAN></NOBR><BR><SPAN CLASS=lg>Executes a command (in this case, "+Xo+"(&#39;ECHO&#39;)'>ECHO</A>ing the message <SPAN CLASS=rfs>Three or more</SPAN>) if the "+Xo+"(&#39;ERRORLEVEL&#39;)'>ERRORLEVEL</A> is <SPAN CLASS=br>greater than or equal</SPAN> to <SPAN CLASS=rfs>3</SPAN>.</SPAN>"+(Ln>=10?Xb+"<NOBR><SPAN CLASS=fx>if exist &#34;c:&#92;my src&#92;*.txt&#34; echo.yes</SPAN></NOBR><BR><SPAN CLASS=lg>"+Xo+"(&#39;ECHO&#39;)'>ECHO</A>es <SPAN CLASS=rfs>yes</SPAN> if at least one file with extension <SPAN CLASS=rfs>TXT</SPAN> exists in <SPAN CLASS=rfs>c:&#92;my src</SPAN> "+Xq+"</SPAN>":"")+(Ln>=10?Xb+"<NOBR><SPAN CLASS=fx>if exist c:&#92;folder&#92;nul echo.yes</SPAN></NOBR><BR><SPAN CLASS=lg>"+Xo+"(&#39;ECHO&#39;)'>ECHO</A>es <SPAN CLASS=rfs>yes</SPAN> if <SPAN CLASS=rfs>c:&#92;folder</SPAN> exists ("+Xo+"(&#39;NUL&#39;)'>NUL</A> file formally exists in all existing folders).</SPAN>":"")+(Ln>=12?Xb+"<NOBR><SPAN CLASS=fx>IF one==one GOTO LABEL</SPAN></NOBR><BR><SPAN CLASS=lg>In Batch file, jumps to <SPAN CLASS=rfs>LABEL</SPAN> since the condition is true (note double <SPAN CLASS=ky>&nbsp;==&nbsp;</SPAN>).</SPAN>":"")+(Ln>=12?Xb+"<NOBR><SPAN CLASS=fx>IF one two==one GOTO LABEL</SPAN></NOBR><BR><SPAN CLASS=lg>Jumps to <SPAN CLASS=rfs>LABEL</SPAN>, since only first token on either side is actually compared (the <SPAN CLASS=rfs>two</SPAN> is ignored).</SPAN>":"")+(Ln>=12?Xb+"<NOBR><SPAN CLASS=fx>IF ()==(%VAR%) GOTO LABEL</SPAN></NOBR><BR><SPAN CLASS=lg>Jumps to <SPAN CLASS=rfs>LABEL</SPAN> if variable <SPAN CLASS=rfs>VAR</SPAN> is empty. The (brackets) prevent syntax error if a variable empty.</SPAN>":"")+Xb+"<SPAN CLASS=ci>IF NOT</SPAN> inverts the logic of the test.";Cn["IF"]=s}
if (Ln>=4) {s=Xc+"NUL</SPAN> (the &#34;bit bucket&#34;"+(Ln>=7?", see "+Xo+"(&#39;device&#39;)'>device</A>":"")+")"+Xb+"Messages sent to <SPAN CLASS=ci>NUL</SPAN> are discarded."+(Ln>=10?Xb+"See "+Xo+"(&#39;IF&#39;)'>IF</A> for use of <SPAN CLASS=ci>NUL</SPAN> in folder existence testing.":"");Cn["NUL"]=s}
if (Ln>=5) {s=Xc+"::</SPAN> (Comment introducer, see under "+Xo+"(&#39;REM&#39;)'>REM</A>)"+Xb+"Comments can be introduced with <SPAN CLASS=ci>::</SPAN> or "+Xo+"(&#39;REM&#39;)'>REM</A>.";Cn["::"]=s}
if (Ln>=5) {s=Xc+"comment</SPAN> (see under "+Xo+"(&#39;REM&#39;)'>REM</A>)"+Xb+"Comments can be introduced with "+Xo+"(&#39;::&#39;)'>::</A> or "+Xo+"(&#39;REM&#39;)'>REM</A>.";Cn["comment"]=s}
if (Ln>=5) {s=Xc+"GOTO</SPAN> (jump to label in Batch file)<BR>"+Xh+Xi+Xb+"<NOBR><SPAN CLASS=fx>GOTO SECTION1</SPAN></NOBR><BR><SPAN CLASS=lg>In Batch file, jump (backwards or forwards) to <SPAN CLASS=br>first</SPAN> line with label <SPAN CLASS=rfs>:SECTION1</SPAN>. Labels must be unique over their first 8 characters excluding their <SPAN CLASS=ky>&nbsp;:&nbsp;</SPAN> prefix. You don&#39;t need to include the <SPAN CLASS=ky>&nbsp;:&nbsp;</SPAN> in the label as part of the <SPAN CLASS=ci>GOTO</SPAN> command (but you can if you wish).</SPAN>"+Xb+"<NOBR><SPAN CLASS=fx>GOTO SECTION123</SPAN></NOBR><BR><SPAN CLASS=lg>This command would jump to the first label starting with <SPAN CLASS=ky>&nbsp;:&nbsp;</SPAN>+8 characters <SPAN CLASS=rfs>SECTION1</SPAN> eg: <SPAN CLASS=rfs>SECTION199</SPAN>.</SPAN>"+Xb+"Remember: when there are two equivalent labels in a Batch script, only the <SPAN CLASS=br>first</SPAN> one is found by <SPAN CLASS=ci>GOTO</SPAN>.";Cn["GOTO"]=s}
if (Ln>=5) {s=Xc+"REM</SPAN> (introduces remark or comment in Batch file)<BR>"+Xh+Xi+Xb+"<NOBR><SPAN CLASS=fx>REM This is ignored</SPAN></NOBR><BR><SPAN CLASS=lg>Characters after <SPAN CLASS=rfs>REM</SPAN><SPAN CLASS=ky>&nbsp;Space&nbsp;</SPAN> are ignored"+(Ln>=7?", unless it contains "+Xo+"(&#39;redirection&#39;)'>redirection</A> operators"+(Ln>=16?" or <SPAN CLASS=fx>&#124;</SPAN> ("+Xo+"(&#39;pipe&#39;)'>pipe</A> operator)":""):"")+".</SPAN>"+(Ln>=7?Xb+"<NOBR><SPAN CLASS=fx>REM Initialise file>&#34;C:&#92;Empty File.txt&#34;</SPAN></NOBR><BR><SPAN CLASS=lg>Creates new zero-byte file <NOBR><SPAN CLASS=rfs>C:&#92;Empty File.txt</SPAN></NOBR> "+Xq+". <SPAN CLASS=ci>REM</SPAN>&#39;s <NOBR>&#34;output&#34;</NOBR> (=nothing) can be redirected to clear a new file.</SPAN>":"")+Xb+"<NOBR><SPAN CLASS=fx>:: Now check if errorlevel > or = to 1</SPAN></NOBR><BR><SPAN CLASS=lg>A <SPAN CLASS=rfs>::</SPAN> also introduces a comment. "+(Ln>=7?"Unlike <SPAN CLASS=ci>REM</SPAN>, any "+Xo+"(&#39;redirection&#39;)'>redirection</A>"+(Ln>=16?" or "+Xo+"(&#39;pipe&#39;)'>pipe</A> operator":"")+" is ignored. As a result, ":"")+"<SPAN CLASS=rfs>::</SPAN> comments are processed faster than <SPAN CLASS=ci>REM</SPAN> comments.</SPAN>"+(Ln>=7?Xb+"See also "+Xo+"(&#39;redirection&#39;)'>redirection</A>.":"");Cn["REM"]=s}
