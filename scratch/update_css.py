with open('style.css', 'r', encoding='utf-8') as f:
    content = f.read()

old_css = """/* ===== BIGGER GALLERY SLIDES ===== */
.gallery-slide {
  flex: 0 0 calc(25% - 1rem);
  min-width: calc(25% - 1rem);
  aspect-ratio: 3/2;
  border-radius: 20px;
}"""

new_css = """/* ===== BIGGER GALLERY SLIDES ===== */
.gallery-slide {
  flex: 0 0 calc(33.333% - 0.833rem);
  min-width: calc(33.333% - 0.833rem);
  aspect-ratio: 3/2;
  border-radius: 20px;
}"""

content = content.replace(old_css, new_css)
# Also try replacing with \r\n if the first one fails
content = content.replace(old_css.replace('\n', '\r\n'), new_css)

with open('style.css', 'w', encoding='utf-8') as f:
    f.write(content)

print("Replaced CSS")
