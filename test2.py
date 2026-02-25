import re

with open('README_test.md', 'r') as f:
    readme = f.read()

table_match = re.search(r'<table.*?>(.*?)</table>', readme, re.DOTALL)
if not table_match:
    print("Table not found!")
    exit(1)

table_html = table_match.group(1)

# Find all tr
rows = re.findall(r'<tr.*?>(.*?)</tr>', table_html, re.DOTALL)

for row in rows:
    # Find all td inside tr
    cols = re.findall(r'<td.*?>(.*?)</td>', row, re.DOTALL)
    if not cols or len(cols) < 3:
        continue
    
    col0 = cols[0].strip()
    col2 = cols[2].strip()
    
    # Check if col0 matches <strong>Week 1</strong>
    week_match = re.search(r'Week\s+(\d+)', col0)
    if week_match:
        week_num = int(week_match.group(1))
        topic_html = col2
        
        # Clean up topic_html
        topic_clean = re.sub(r'\[?\s*<a href=".*?">slides</a>\s*\]?', '', topic_html, flags=re.IGNORECASE)
        topic_clean = topic_clean.replace('&#124;', '|')
        topic_clean = topic_clean.replace('|', '\|')
        topic_clean = re.sub(r'<br\s*/?>', '<br>', topic_clean, flags=re.IGNORECASE)
        topic_clean = re.sub(r'\s+', ' ', topic_clean).strip()
        print(f"Week {week_num}: {topic_clean}")
