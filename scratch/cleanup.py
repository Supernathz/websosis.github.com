with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the SECOND </html> and keep only up to the first one
parts = content.split('</html>')
if len(parts) > 2:
    # Keep up to the first </html>
    clean = parts[0] + '</html>\n'
else:
    clean = content

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(clean)
print("Cleaned. Lines:", clean.count('\n'))
