carousel_css = r"""

/* ===== GALLERY CAROUSEL ===== */
.gallery-carousel {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2.5rem;
}

.carousel-track-outer {
  overflow: hidden;
  border-radius: 20px;
  flex: 1;
}

.carousel-track {
  display: flex;
  gap: 1.25rem;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;
}

.gallery-slide {
  flex: 0 0 calc(25% - 1rem);
  min-width: calc(25% - 1rem);
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(44,76,126,0.12);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.gallery-slide:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 12px 35px rgba(44,76,126,0.22);
}

.gallery-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.gallery-slide:hover img { transform: scale(1.07); }

/* Reuse existing overlay styles */
.gallery-slide .gallery-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(44,76,126,0.85), transparent);
  display: flex;
  align-items: flex-end;
  padding: 1.25rem;
  opacity: 0;
  transition: opacity 0.35s ease;
}
.gallery-slide:hover .gallery-overlay { opacity: 1; }

/* Arrow Buttons */
.carousel-btn {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  background: white;
  color: var(--primary);
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 12px rgba(44,76,126,0.1);
  z-index: 2;
}

.carousel-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  box-shadow: 0 6px 20px rgba(44,76,126,0.25);
  transform: scale(1.08);
}

.carousel-btn:active { transform: scale(0.96); }

/* Dot indicators */
.carousel-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 1.75rem;
}

.carousel-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border-color);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carousel-dot.active {
  background: var(--primary);
  width: 24px;
  border-radius: 4px;
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
  .carousel-btn { width: 38px; height: 38px; font-size: 0.85rem; }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(carousel_css)
print("CSS done.")
