import os
import re

files = [f for f in os.listdir('.') if f.endswith('.html')]
for f in files:
    try:
        with open(f, 'r', encoding='utf-8', errors='ignore') as file:
            content = file.read()
        
        new_content = re.sub(r'<a href="komunitas-animation\.html">.*?</a>', '', content)
        new_content = re.sub(r'<a href="acara-paskah\.html">.*?</a>', '', new_content)
        
        if content != new_content:
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Updated {f}")
    except Exception as e:
        print(f"Error updating {f}: {e}")
