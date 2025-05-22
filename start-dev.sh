#!/bin/bash
echo "Starting server and stage 1 development..."

# Start the server in a new terminal
gnome-terminal -- bash -c "cd server && npm run dev; bash" || \
xterm -e "cd server && npm run dev; bash" || \
open -a Terminal.app server && cd server && npm run dev

# Wait for server to start
sleep 5

# Start the client in a new terminal
gnome-terminal -- bash -c "cd stage1-raw-http && npm start; bash" || \
xterm -e "cd stage1-raw-http && npm start; bash" || \
open -a Terminal.app stage1-raw-http && cd stage1-raw-http && npm start

echo "Development environments started. Check the terminal windows for details." 