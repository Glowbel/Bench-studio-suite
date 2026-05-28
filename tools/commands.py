COMMANDS = {
    "RUN001": "cp /data/data/com.termux/files/home/notion_pull.py /data/data/com.termux/files/home/Bench-studio-suite/tools/notion_pull.py",
    "RUN002": "cd /data/data/com.termux/files/home/Bench-studio-suite && git add -f tools/ && git commit -m chore:sync && git push",
    "RUN003": "cat /data/data/com.termux/files/home/notion_pull.py",
    "RUN004": "cat /data/data/com.termux/files/home/watch.sh",
    "REVERT001": "cd /data/data/com.termux/files/home/Bench-studio-suite && git revert HEAD --no-edit && git push",
    "REVERT002": "cd /data/data/com.termux/files/home/Bench-studio-suite && git log --oneline -10",
    "REVERT003": "cd /data/data/com.termux/files/home/Bench-studio-suite && git checkout HEAD -- ",
    "REVERT004": "cd /data/data/com.termux/files/home/Bench-studio-suite && git checkout ",
    "REFRESH": "cd /data/data/com.termux/files/home/Bench-studio-suite && git pull"
}
