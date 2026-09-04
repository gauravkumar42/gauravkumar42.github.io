// ------ SCROLL REVEAL + SCROLL PROGRESS ------
// Shared across every page. Reveals use IntersectionObserver instead of a
// scroll listener, so elements animate in once and stop being checked.

(() => {
  const reveals = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reveals.length && !reducedMotion) {
    // small stagger for elements that sit next to each other in a group
    const groups = document.querySelectorAll('[data-reveal-group]');
    groups.forEach(group => {
      const items = group.querySelectorAll('.reveal');
      items.forEach((el, i) => {
        el.style.setProperty('--delay', `${i * 90}ms`);
      });
    });

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('active'));
  }

  // thin progress line that fills as the page scrolls
  const progressBar = document.getElementById('scroll-progress');

  const updateScrollProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, pct))}%`;
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('load', updateScrollProgress);
  window.addEventListener('resize', updateScrollProgress);
  updateScrollProgress();
})();