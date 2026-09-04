fetch('/partials/header.html', { cache: 'no-store' })
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-root').innerHTML = html;

    const header = document.getElementById('site-header');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = currentPath === 'index.html' || currentPath === '';

    // subpages don't have a transparent hero under the navbar, so keep it solid
    if (!isHome) {
      header.classList.add('solid');
    }

    // mark the nav link matching the current page as active
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const linkFile = link.getAttribute('href').split('/').pop() || 'index.html';
      const isMatch = linkFile === currentPath || (isHome && linkFile === 'index.html');
      link.classList.toggle('active', isMatch);
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });

    // toggle the frosted-glass background once the page has scrolled a bit
    const setScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
    };
    window.addEventListener('scroll', setScroll, { passive: true });
    setScroll();
  })
  .catch(err => console.error('Header failed to load:', err));