
import httpx
import os
import datetime

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
LOG_DB_ID = "36da1bf9-758b-81b8-8034-f908057d432a"

headers = {
    "Authorization": "Bearer " + NOTION_TOKEN,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

def write_log(title, status, action, file_path, message):
    timestamp = 