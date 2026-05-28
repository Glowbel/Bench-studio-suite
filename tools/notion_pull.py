import os
import httpx
import subprocess
import shutil
import sys
sys.path.insert(0, "/data/data/com.termux/files/home")
import notion_log

NOTION_TOKEN = os.environ.get("NOTION_TOKEN")
DATABASE_ID = "16317b83-2662-4b7a-8980-69fa124784cd"
LOG_DB_ID = "36da1bf9-758b-81ab-9e2a-000b3eafd651"
DEV_MODE = False

headers = {
    "Authorization": "Bearer " + NOTION_TOKEN,
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json"
}

REPO = os.path.expanduser("~/Bench-studio-suite")

def mark_status(page_id, status):
    url = "https://api.notion.com/v1/pages/" + page_id
    httpx.patch(url, headers=headers, json={"properties": {"Status": {"select": {"name": status}}}})

def log_result(title, status, action, file_path, message):
    import datetime
    line = "[" + datetime.datetime.now().strftime("%Y-%m-%d %H:%M") + "] " + status.upper() + " | " + action + " | " + file_path + " | " + title + " | " + message + "\n"
    with open(os.path.join(REPO, "pipeline-log.txt"), "a") as f:
        f.write(line)
    if DEV_MODE or status in ("failed", "applied"):
        notion_log.write_log(title, status, action, file_path, message)

def get_queued_changes():
    url = "https://api.notion.com/v1/databases/" + DATABASE_ID + "/query"
    body = {"filter": {"property": "Status", "select": {"equals": "queued"}}}
    r = httpx.post(url, headers=headers, json=body)
    return r.json()["results"]

def git_pull():
    result = subprocess.run("cd " + REPO + " && git pull", shell=True, capture_output=True, text=True)
    print("git pull: " + result.stdout.strip())




def decode(text):
    text = text.replace("[[SPAN]]", "<span>")
    text = text.replace("[[/SPAN]]", "</span>")
    text = text.replace("[[EM]]", "<em>")
    text = text.replace("[[/EM]]", "</em>")
    text = text.replace("[[STRONG]]", "<strong>")
    text = text.replace("[[/STRONG]]", "</strong>")
    text = text.replace("[[B]]", "<b>")
    text = text.replace("[[/B]]", "</b>")
    text = text.replace("[[I]]", "<i>")
    text = text.replace("[[/I]]", "</i>")
    text = text.replace("[[BR]]", "<br>")
    text = text.replace("[[AMP]]", "&amp;")
    text = text.replace("[[NBSP]]", "&nbsp;")
    text = text.replace("[[US]]", "_")
    text = text.replace("[[NL]]", "\n")
    return text

def syntax_check(full_path):
    if not full_path.endswith(".html"):
        return True
    with open(full_path, "r") as f:
        content = f.read()
    start = content.find("\n<script>")
    end = content.find("</script>")
    if start == -1 or end == -1:
        return True
    js = content[start + 8:end]
    with open("/data/data/com.termux/files/home/tmp/syntax_check.js", "w") as f:
        f.write(js)
    result = subprocess.run("node --check /data/data/com.termux/files/home/tmp/syntax_check.js", shell=True, capture_output=True, text=True)
    if result.returncode != 0:
        print("Syntax error: " + result.stdout.strip())
        return False
    return True

def apply_change(page):
    props = page["properties"]
    title = props["Change Title"]["title"][0]["plain_text"] if props["Change Title"]["title"] else "untitled"
    file_path = "".join([block["plain_text"] for block in props["File Path"]["rich_text"]])
    full_path = os.path.expanduser("~/Bench-studio-suite/" + file_path)
    path = "/data/data/com.termux/files/home/notion_pull.py"
    backup_path = full_path + ".bak"

    try:
        new_code = props["New Code"]["rich_text"][0]["plain_text"] if props["New Code"]["rich_text"] else ""
        commit_msg = props["Commit Message"]["rich_text"][0]["plain_text"] if props["Commit Message"]["rich_text"] else "pipeline commit"
        action = props["Action"]["select"]["name"]
        new_code = decode(new_code)
        target = props["Target Pattern"]["rich_text"][0]["plain_text"] if props["Target Pattern"]["rich_text"] else ""
        target = decode(target)
        if '`' in new_code or '\\' in new_code or '`' in target or '\\' in target:
            mark_status(page["id"], "failed")
            log_result(title, "failed", action, file_path, "rejected: contains backtick or backslash")
            return
        if DEV_MODE:
            log_result(title, "skipped", action, file_path, "DEV received | target: " + target + " | new_code: " + new_code)

        if os.path.exists(full_path):
            shutil.copy2(full_path, backup_path)

        if action == "append":
            os.makedirs(os.path.dirname(full_path), exist_ok=True)
            with open(full_path, "a") as f:
                f.write("\n" + new_code)

        elif action == "replace":
            with open(full_path, "r") as f:
                existing = f.read()
            if target not in existing:
                print("Pattern not found in " + file_path)
                mark_status(page["id"], "failed")
                log_result(title, "failed", action, file_path, "pattern not found | received: " + target)
                return
            with open(full_path, "w") as f:
                f.write(existing.replace(target, new_code, 1))

        elif action == "config":
            if file_path == "DEV_MODE":
                new_val = new_code.strip().lower()
                if new_val in ("true", "false"):
                    import re
                    with open(path, "r") as f:
                        src = f.read()
                    src = re.sub(r"DEV_MODE = (True|False)", "DEV_MODE = " + new_val.capitalize(), src)
                    with open(path, "w") as f:
                        f.write(src)
                    log_result(title, "applied", action, file_path, "DEV_MODE set to " + new_val.capitalize())
                    mark_status(page["id"], "applied")
                    print("DEV_MODE set to " + new_val.capitalize())
                else:
                    log_result(title, "failed", action, file_path, "invalid value: " + new_code)
                    mark_status(page["id"], "failed")
            return
        elif action == "execute":
            result = subprocess.run(new_code, shell=True, capture_output=True, text=True, cwd=REPO)
            output = result.stdout.strip()
            errors = result.stderr.strip()
            full_output = output
            if errors:
                full_output = full_output + " | STDERR: " + errors
            if not full_output:
                full_output = "(no output)"
            if result.returncode == 0:
                log_result(title, "applied", action, file_path, full_output)
                mark_status(page["id"], "applied")
                print("Executed: " + new_code)
            else:
                log_result(title, "failed", action, file_path, full_output)
                mark_status(page["id"], "failed")
                print("Execute failed: " + new_code)
            return
        elif action == "delete":
            with open(full_path, "r") as f:
                existing = f.read()
            with open(full_path, "w") as f:
                f.write(existing.replace(target, "", 1))

        if not syntax_check(full_path):
            print("Syntax check failed - restoring " + file_path)
            if os.path.exists(backup_path):
                shutil.copy2(backup_path, full_path)
            mark_status(page["id"], "failed")
            log_result(title, "failed", action, file_path, "syntax check failed")
            return

        log_result(title, "applied", action, file_path, "ok")
        commit_cmd = "cd " + REPO + " && git add -A && git add -f pipeline-log.txt && git commit -m '" + commit_msg + "' && git push"
        os.system(commit_cmd)
        mark_status(page["id"], "applied")
        print("Applied: " + action + " on " + file_path)

    except Exception as e:
        print("Failed: " + str(e))
        if os.path.exists(backup_path):
            shutil.copy2(backup_path, full_path)
        mark_status(page["id"], "failed")
        log_result(title, "failed", action, file_path, "exception: " + str(e))

    finally:
        if os.path.exists(backup_path):
            os.remove(backup_path)


changes = get_queued_changes()
if not changes:
    print("No queued changes found.")
else:
    for change in changes:
        apply_change(change)
