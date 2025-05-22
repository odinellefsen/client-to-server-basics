@echo off
echo Starting server and stage 1 development...

start cmd /k "cd server && npm run dev"
timeout /t 5
start cmd /k "cd stage1-raw-http && npm start"

echo Development environments started. Check the terminal windows for details. 