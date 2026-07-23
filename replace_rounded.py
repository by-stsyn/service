import os
import re

def process_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Replace rounded-sm with rounded-xl
    new_content = re.sub(r'\brounded-sm\b', 'rounded-xl', content)
    # Replace rounded with rounded-xl (where it is standalone class)
    new_content = re.sub(r'(?<=\s)rounded(?=\s|")', 'rounded-xl', new_content)
    # Also catch rounded' if using single quotes
    new_content = re.sub(r"(?<=\s)rounded(?=\s|')", 'rounded-xl', new_content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts'):
            process_file(os.path.join(root, file))
