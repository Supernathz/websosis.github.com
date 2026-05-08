css = r"""

/* ===== TENTANG KAMI ===== */
.tentang-section { background: white; }

.tentang-grid {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 5rem;
  align-items: center;
}

.tentang-label {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 2.5px;
  margin-bottom: 1.25rem;
  padding-left: 1rem;
  border-left: 3px solid var(--accent-cyan);
}

.tentang-title {
  font-size: clamp(1.5rem, 2.8vw, 2.3rem);
  font-weight: 800;
  color: var(--primary);
  line-height: 1.3;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
}

.tentang-accent { color: var(--accent-orange); }

.tentang-desc {
  font-size: 1rem;
  color: var(--text-muted);
  line-height: 1.85;
  margin-bottom: 2rem;
}

.tentang-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--bg-color);
  border: 1px solid var(--border-color);
  color: var(--primary);
  padding: 0.65rem 1.5rem;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.tentang-badge:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.tentang-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.tentang-logo img {
  width: 100%;
  max-width: 280px;
  height: auto;
  border-radius: 50%;
  box-shadow: var(--shadow-xl);
  transition: transform 0.4s ease;
}

.tentang-logo img:hover { transform: scale(1.04) rotate(2deg); }

@media (max-width: 768px) {
  .tentang-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    text-align: center;
  }
  .tentang-label { border-left: none; padding-left: 0; }
  .tentang-logo { justify-content: center; order: -1; }
  .tentang-logo img { max-width: 160px; }
}

/* ===== SCROLL-REVEAL ANIMATION SYSTEM ===== */
.reveal-item {
  opacity: 0;
  transform: translateY(32px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}
.reveal-item.is-visible { opacity: 1; transform: translateY(0); }
.reveal-item:nth-child(1) { transition-delay: 0s; }
.reveal-item:nth-child(2) { transition-delay: 0.1s; }
.reveal-item:nth-child(3) { transition-delay: 0.2s; }
.reveal-item:nth-child(4) { transition-delay: 0.3s; }
.reveal-item:nth-child(5) { transition-delay: 0.4s; }

.cards-grid .card {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.4s ease, background 0.4s ease;
}
.cards-grid .card.is-visible { opacity: 1; transform: translateY(0); }
.cards-grid .card:nth-child(1) { transition-delay: 0s; }
.cards-grid .card:nth-child(2) { transition-delay: 0.12s; }
.cards-grid .card:nth-child(3) { transition-delay: 0.24s; }

.gallery-item {
  opacity: 0;
  transform: translateY(30px) scale(0.97);
  transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              box-shadow 0.5s ease;
}
.gallery-item.is-visible { opacity: 1; transform: translateY(0) scale(1); }
.gallery-item:nth-child(1) { transition-delay: 0s; }
.gallery-item:nth-child(2) { transition-delay: 0.07s; }
.gallery-item:nth-child(3) { transition-delay: 0.14s; }
.gallery-item:nth-child(4) { transition-delay: 0.21s; }
.gallery-item:nth-child(5) { transition-delay: 0.28s; }
.gallery-item:nth-child(6) { transition-delay: 0.35s; }
.gallery-item:nth-child(7) { transition-delay: 0.42s; }
.gallery-item:nth-child(8) { transition-delay: 0.49s; }
.gallery-item.is-visible:hover { transform: scale(1.03) translateY(-5px); box-shadow: var(--shadow-xl); z-index: 2; }
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)
print("Done.")
