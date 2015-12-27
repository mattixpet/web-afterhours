::compile.bat
::compiles jade files and stylus files into .html and .css
::from afterhours folder
@echo off & setlocal enabledelayedexpansion

::jade index
echo executing command: jade templates/index.jade -o "../site/afterhours" -P
call jade templates/index.jade -o "../site/afterhours" -P
::jade about
echo executing command: jade templates/about.jade -o "../site/afterhours" -P
call jade templates/about.jade -o "../site/afterhours" -P
::jade contact
echo executing command: jade templates/contact.jade -o "../site/afterhours" -P
call jade templates/contact.jade -o "../site/afterhours" -P

::stylus!!!
echo executing command: stylus styles/style.styl -o "../site/afterhours/css/"
call stylus styles/style.styl -o "../site/afterhours/css/"

::move to ../site/afterhours directory, lets not change html files elsewhere
echo. & echo executing command: cd site
call cd ../site/afterhours

::first, delete all old .php files, to be ready for the renaming of html files to .php
echo. & echo deleting old .php files..
::ignore files that exist only as .php files, like the language files
set ignores= none.php
echo php files to ignore:
for %%i in (%ignores%) do echo %%i
echo.

for /r %%d in (*.php) do (
  set inIgnores= 0
  for %%i in (%ignores%) do (
    :: %%~nd%%~xd means just name.extension, a cleaner way than this probably exists..
    if "%%i" == "%%~nd%%~xd" (
      set inIgnores= 1
    )
  )
  if !inIgnores! lss 1 (
    echo %%d
    rm %%d
  ) else (
    echo ignoring file %%d
  )
)
echo files deleted & echo.

::now rename all .html files to .php for our viewing pleasures
echo renaming .html to .php

set htmlignores= index.html
echo html files to ignore:
for %%i in (%htmlignores%) do echo %%i
echo.

for /r %%d in (*.html) do (
  set inIgnores= 0
  for %%i in (%htmlignores%) do (
    :: %%~nd%%~xd means just name.extension, a cleaner way than this probably exists..
    if "%%i" == "%%~nd%%~xd" (
      set inIgnores= 1
    )
  )
  if !inIgnores! lss 1 (
    echo %%d
    ren "%%~d" *.php
  ) else (
    echo ignoring file %%d
  )
)
echo files renamed & echo.

echo special case, rename index.html in root
ren "%~dp0\..\site\afterhours\index.html" "index.php"
echo %~dp0%\..\site\afterhours\index.html renamed
