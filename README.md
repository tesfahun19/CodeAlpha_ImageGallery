# CodeAlpha - Interactive Image Gallery with Production-Grade Accessibility

A modern, highly responsive, and fully web-accessible (A11y) interactive image gallery built using vanilla HTML5, CSS3, and modern JavaScript (ES6+). This project demonstrates a clean software engineering approach to building robust user interfaces without relying on heavy external frameworks.

## 🚀 Live Demo
Experience the live application here:👉 https://tesfahun19.github.io/CodeAlpha_ImageGallery/

---

## ✨ Key Features

- **Dynamic UI Rendering & Filtering:** Processes runtime data layers seamlessly to filter and display image categories (Nature, Architecture, Animals) instantaneously without page reloads.
- **Production-Grade Accessibility (A11y):**
  - **Full Focus Trapping:** Implements advanced keyboard event listeners within the Lightbox Modal (`role="dialog"`, `aria-modal="true"`) to prevent focus leakage to the background.
  - **Dynamic ARIA State Syncing:** Utilizes `aria-pressed` for real-time filter button state mutation updates and `aria-labelledby` for live screen-reader accessibility.
  - **Keyboard Native Traversal:** Full navigation support via `Tab`, `Shift + Tab`, `Escape`, and `Arrow` keys.
- **Advanced Responsive Layouts:** Engineered with a fluid CSS Grid utilizing `repeat(auto-fill, minmax(280px, 1fr))` and Flexbox modules for flawless rendering across all mobile, tablet, and desktop form factors.
- **Performance Optimized:** Implements native browser asset optimization using `loading="lazy"` mechanics to reduce initial page load times and improve paint metrics.
- **Inclusivity & User Preference:** Respects system-level user preferences via `prefers-reduced-motion` media queries to automatically suppress complex transitions for sensitive users.

---

## 🛠️ Tech Stack & Concepts Applied

- **Structure:** HTML5 (Semantic Architecture)
- **Styling:** CSS3 (Custom Grid, Flexbox Layouts, Hover Animations)
- **Logic:** Vanilla JavaScript (ES6 Modules, DOM Caching, State Management, Event Propagation Control)
- **Standards:** WCAG 2.1 Accessibility Guidelines
