@echo off
echo Starting Smart Email AI Assistant...
echo.

echo Starting Spring Boot Backend...
start "Backend - Port 8080" cmd /k "cd /d c:\springprojects\email\email-writer-sb && java -jar target\email-writer-sb-0.0.1-SNAPSHOT.jar"

echo Waiting for backend to start...
timeout /t 10 /nobreak > nul

echo Starting React Frontend...
start "Frontend - Port 5173" cmd /k "cd /d c:\springprojects\email\email-writer-react && npm run dev"

echo.
echo Both servers are starting!
echo Backend  --> http://localhost:8080
echo Frontend --> http://localhost:5173
echo.
echo Opening browser in 15 seconds...
timeout /t 15 /nobreak > nul
start "" "http://localhost:5173"
