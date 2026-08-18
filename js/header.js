fetch('/partials/header.html')
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-root').innerHTML = html;

    const header = document.getElementById('site-header');
    const setScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', setScroll);
    setScroll();

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const currentHash = window.location.hash; // e.g. "#contact" or ""

    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href'); // e.g. "/index.html#contact"
      const [linkPath, linkHash] = href.split('#');
      const linkFile = linkPath.split('/').pop() || 'index.html';

      const isMatch =
        linkFile === currentPath && (!linkHash || `#${linkHash}` === currentHash);

      link.classList.toggle('active', isMatch);

      // Accessibility: tell assistive tech which nav item is the current page
      if (isMatch) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  })
  .catch(err => console.error('Header failed to load:', err));