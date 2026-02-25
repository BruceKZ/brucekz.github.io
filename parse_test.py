import re

with open('README_test.md', 'r', encoding='utf-8') as f:
    readme = f.read()

# Try to extract the table
table_match = re.search(r'<table.*?>(.*?)</table>', readme, re.DOTALL)
if not table_match:
    print("Table not found!")
    exit(1)

table_html = table_match.group(1)
row_pattern = re.compile(r'<tr>\s*<td.*?>\s*<strong>Week (\d+)</strong>\s*</td>\s*<td.*?>.*?</td>\s*<td.*?>(.*?)</td>', re.DOTALL)

for match in row_pattern.finditer(table_html):
    week_num = int(match.group(1))
    topic_html = match.group(2)
    # clean up
    topic_clean = re.sub(r'\[?\s*<a href=".*?">slides</a>\s*\]?', '', topic_html)
    topic_clean = topic_clean.replace('&#124;', '|')
    topic_clean = re.sub(r'<br\s*/?>', '<br>', topic_clean)
    topic_clean = re.sub(r'\s+', ' ', topic_clean).strip()
    topic_clean = topic_clean.replace('|', '\|') # Escape | for markdown table
    print(f"Week {week_num}: {topic_clean}")
