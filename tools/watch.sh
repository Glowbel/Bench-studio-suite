#!/bin/bash
echo "Starting dev server on port 8080..."
cd ~/Bench-studio-suite && python3 -m http.server 8080 &
echo "Dev server running at http://localhost:8080"
echo "Notion API pull bootup confirmed"
cd ~/Bench-studio-suite && git pull
while true; do
    python3 ~/notion_pull.py
    sleep 0.5
done
