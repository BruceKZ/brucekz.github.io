import os
import re
import shutil

REPO_DIR = "/tmp/cs552-repo"
TARGET_DIR = "docs/.vuepress/public/pdf/nlp"
MARKDOWN_FILE = "docs/courses/nlp/course-slides.md"
README_FILE = os.path.join(REPO_DIR, "README.md")
LECTURES_DIR = os.path.join(REPO_DIR, "Lectures")

os.makedirs(TARGET_DIR, exist_ok=True)

weeks_data = {}
if os.path.exists(README_FILE):
    with open(README_FILE, 'r', encoding='utf-8') as f:
        readme = f.read()
    
    table_match = re.search(r'<table.*?>(.*?)</table>', readme, re.DOTALL)
    if table_match:
        table_html = table_match.group(1)
        rows = re.findall(r'<tr.*?>(.*?)</tr>', table_html, re.DOTALL)
        for row in rows:
            cols = re.findall(r'<td.*?>(.*?)</td>', row, re.DOTALL)
            if not cols or len(cols) < 3:
                continue
            
            col0 = cols[0].strip()
            col2 = cols[2].strip()
            
            week_match = re.search(r'Week\s+(\d+)', col0)
            if week_match:
                week_num = int(week_match.group(1))
                topic_html = col2
                
                topic_clean = re.sub(r'\[?\s*<a href=".*?">slides</a>\s*\]?', '', topic_html, flags=re.IGNORECASE)
                topic_clean = topic_clean.replace('&#124;', '|')
                topic_clean = topic_clean.replace('|', '\\|')
                topic_clean = re.sub(r'<br\s*/?>', '<br>', topic_clean, flags=re.IGNORECASE)
                topic_clean = re.sub(r'\s+', ' ', topic_clean).strip()
                weeks_data[week_num] = topic_clean

with open(MARKDOWN_FILE, "w", encoding='utf-8') as f:
    f.write("---\n")
    f.write("title: Course Slides\n")
    f.write("author: GitHub Actions\n")
    f.write("contributors: false\n")
    f.write("---\n\n")
    f.write("# CS-552 Course Slides\n\n")

    if os.path.exists(LECTURES_DIR):
        week_dirs = [d for d in os.listdir(LECTURES_DIR) if d.startswith("Week_") and os.path.isdir(os.path.join(LECTURES_DIR, d))]
        week_dirs.sort(key=lambda x: int(x.split('_')[1]))

        for week_dir in week_dirs:
            week_num = int(week_dir.split('_')[1])
            week_path = os.path.join(LECTURES_DIR, week_dir)
            pdfs = [p for p in os.listdir(week_path) if p.endswith('.pdf')]
            
            if pdfs:
                pdfs.sort()
                f.write(f"## Week {week_num}\n\n")
                f.write("| Slide Name | Link |\n")
                f.write("|---|---|\n")
                
                topic = weeks_data.get(week_num, f"Week {week_num} topics")
                
                for pdf in pdfs:
                    src_pdf = os.path.join(week_path, pdf)
                    dst_pdf = os.path.join(TARGET_DIR, pdf)
                    shutil.copy2(src_pdf, dst_pdf)
                    f.write(f"| {topic} | [{pdf}](https://blog.bruce12138.com/pdf/nlp/{pdf}) |\n")
                f.write("\n")
