// ------ SCROLL REVEAL + SCROLL PROGRESS ------
// Shared across every page (previously this lived only in app.js, which
// was never included on about.html — so the About page's .reveal elements
// never animated in. Loading this file on every page fixes that.)

(() => {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach((el) => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  };

  // Thin progress line that fills as the page scrolls — the site's one
  // mouse-scroll effect, functional rather than decorative.
  const progressBar = document.getElementById("scroll-progress");

  const updateScrollProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };

  const onScroll = () => {
    revealOnScroll();
    updateScrollProgress();
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("load", onScroll);
  window.addEventListener("resize", updateScrollProgress);
})();
