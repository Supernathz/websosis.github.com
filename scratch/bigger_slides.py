css = r"""

/* ===== BIGGER GALLERY SLIDES ===== */
.gallery-slide {
  flex: 0 0 calc(25% - 1rem);
  min-width: calc(25% - 1rem);
  aspect-ratio: 3/2;
  border-radius: 20px;
}

@media (max-width: 900px) {
  .gallery-slide {
    flex: 0 0 calc(50% - 0.75rem);
    min-width: calc(50% - 0.75rem);
  }
}

@media (max-width: 540px) {
  .gallery-slide {
    flex: 0 0 100%;
    min-width: 100%;
  }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)
print("Done.")
