@echo off
chcp 949 > nul

:: 관리자 권한 체크
>nul 2>&1 "%SYSTEMROOT%\system32\cacls.exe" "%SYSTEMROOT%\system32\config\system"
if '%errorlevel%' NEQ '0' (
  echo 관리자 권한이 필요합니다. 권한 요청을 시작합니다...
  goto UACPrompt
) else (goto gotAdmin)

:UACPrompt

echo Set UAC = CreateObject^("Shell.Application"^) > "%temp%\getadmin.vbs"
echo UAC.ShellExecute "%~s0", "", "", "runas", 1 >> "%temp%\getadmin.vbs"
"%temp%\getadmin.vbs"
exit /B

:gotAdmin

if exist "%temp%\getadmin.vbs" del "%temp%\getadmin.vbs"
pushd "%CD%"
cd /D "%~dp0"

REM 여기서부터 실제 작업 수행

echo ====================================
echo    크롬/엣지 팝업 허용 설정 도구
echo ====================================
echo.
echo 크롬 및 엣지 팝업 허용 설정을 적용합니다...

REM 임시 레지스트리 파일 생성
set regFile=%temp%\allow_edge_popups.reg

echo Windows Registry Editor Version 5.00 > "%regFile%"
echo. >> "%regFile%"
echo ; Chrome 팝업 허용 >> "%regFile%"
echo [HKEY_LOCAL_MACHINE\Software\Policies\Google\Chrome\PopupsAllowedForUrls] >> "%regFile%"
echo "1"="http://crm.himo.com:8080" >> "%regFile%"
echo. >> "%regFile%"
echo ; Edge 팝업 허용 >> "%regFile%"
echo [HKEY_LOCAL_MACHINE\Software\Policies\Microsoft\Edge\PopupsAllowedForUrls] >> "%regFile%"
echo "1"="http://crm.himo.com:8080" >> "%regFile%"

echo 레지스트리를 적용하는 중...
reg import "%regFile%"

if %errorlevel% neq 0 (
    echo [오류] 레지스트리 등록에 실패했습니다.
    echo 관리자 권한으로 다시 실행해보세요.
) else (
    echo [완료] 팝업 허용 설정이 적용되었습니다.
    echo.
    echo  다음 단계:
    echo    1. Chrome과 Edge 브라우저를 완전히 종료
    echo    2. 브라우저를 다시 시작
    echo    3. http://crm.himo.com:8080 접속 테스트
)

REM 임시 파일 삭제
if exist "%regFile%" del "%regFile%"

echo.
echo 아무 키나 눌러서 종료하세요...
pause > nul
