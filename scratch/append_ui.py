css = r"""

/* ===== SQUARE IMAGE for Tentang Kami ===== */
.tentang-img-square {
  width: 100%;
  max-width: 300px;
  height: 300px;
  object-fit: contain;
  border-radius: 24px;
  background: var(--bg-color);
  padding: 1.5rem;
  box-shadow: var(--shadow-xl);
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.tentang-img-square:hover { transform: scale(1.04) rotate(1deg); }

/* ===== SCROLL-DOWN INDICATOR ===== */
.scroll-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  margin-top: -2.5rem;
  margin-bottom: 1rem;
  z-index: 10;
  animation: fadeInScroll 1.5s ease 1.5s both;
}
.scroll-indicator span {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-muted);
}
.scroll-arrow {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 0.8rem;
  animation: bounceDown 1.8s ease-in-out infinite;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease;
}
.scroll-arrow:hover { background: var(--primary); color: white; border-color: var(--primary); }

@keyframes bounceDown {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(7px); }
}
@keyframes fadeInScroll {
  from { opacity: 0; transform: translateY(-10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.scroll-indicator.hidden { opacity: 0; pointer-events: none; transition: opacity 0.5s ease; }

/* ===== IMPROVED SECTION TITLES ===== */
.section-title h2 {
  position: relative;
  display: inline-block;
  padding-bottom: 0.8rem;
}
.section-title h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 4px;
  background: linear-gradient(90deg, var(--accent-cyan), var(--primary));
  border-radius: 4px;
}

/* ===== IMPROVED CARD ICONS ===== */
.card-icon {
  background: linear-gradient(135deg, rgba(0,158,181,0.1), rgba(44,76,126,0.08));
  border: 1px solid rgba(0,158,181,0.15);
}
.card:hover .card-icon {
  background: linear-gradient(135deg, var(--accent-cyan), var(--primary));
  border-color: transparent;
}

/* ===== IMPROVED FEATURES BG ===== */
.features {
  background: linear-gradient(180deg, white 0%, var(--bg-color) 100%);
}

/* ===== IMPROVED GALLERY BG ===== */
.gallery-section {
  background: linear-gradient(180deg, var(--white-blue) 0%, #dbe6f0 100%);
}

/* ===== NAVBAR SCROLL EFFECT ===== */
.navbar.scrolled {
  background: rgba(255,255,255,0.98);
  box-shadow: 0 4px 20px rgba(44,76,126,0.1);
}

/* ===== HERO SECTION POLISH ===== */
.hero::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to top, white, transparent);
  pointer-events: none;
}

/* ===== IMPROVED BUTTON GLOW ===== */
.btn-primary:hover {
  box-shadow: 0 15px 30px rgba(0,158,181,0.35);
}

/* ===== REVEAL FROM SIDE for tentang-logo ===== */
.tentang-logo.reveal-item {
  opacity: 0;
  transform: translateX(40px);
  transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.25s;
}
.tentang-logo.reveal-item.is-visible { opacity: 1; transform: translateX(0); }

/* ===== SECTION DIVIDER WAVE ===== */
.tentang-section {
  position: relative;
  overflow: visible;
}

@media (max-width: 768px) {
  .scroll-indicator { margin-top: -1.5rem; }
  .tentang-img-square { max-width: 200px; height: 200px; }
}
"""

with open('style.css', 'a', encoding='utf-8') as f:
    f.write(css)
print("Done.")
