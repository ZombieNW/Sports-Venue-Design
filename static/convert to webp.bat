@echo off
setlocal enabledelayedexpansion

set "ffmpeg_path=ffmpeg"
set "input_directory=%cd%"

for /r "%input_directory%" %%F in (*.png *.jpg *.jpeg) do (
    set "input_file=%%F"
    set "output_file=%%~dpF%%~nF.webp"
    set "temp_file=!output_file!.temp.webp"

    echo Converting "!input_file!" to temporary file "!temp_file!"
    "%ffmpeg_path%" -y -i "!input_file!" -preset picture -q:v 80 "!temp_file!"

    if exist "!temp_file!" (
        echo Optimizing "!temp_file!" to "!output_file!"
        "%ffmpeg_path%" -y -i "!temp_file!" -vf "null" -preset default -q:v 80 -pix_fmt yuv420p -map_metadata -1 -map_chapters -1 "!output_file!"

        if exist "!output_file!" (
            echo Deleting "!input_file!"
            del "!input_file!"
        ) else (
            echo Failed to optimize "!temp_file!" to "!output_file!"
        )

        if exist "!temp_file!" (
            echo Deleting temporary file "!temp_file!"
            del "!temp_file!"
        )
    ) else (
        echo Failed to convert "!input_file!" to temporary file "!temp_file!"
    )
)

echo Conversion and optimization completed!
endlocal
pause
