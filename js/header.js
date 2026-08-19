fetch('/partials/header.html', { cache: 'no-store' })
  .then(res => res.text())
  .then(html => {
    document.getElementById('header-root').innerHTML = html;

    const header = document.getElementById('site-header');
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isHome = currentPath === 'index.html';

    const navLinks = document.querySelectorAll('.nav-link');

    function updateActive() {
      let currentHash = window.location.hash;

      // On the homepage, derive the active section from scroll position,
      // not just the (sticky) URL hash — fixes stale hash after scrolling up
      if (isHome) {
        const works = document.getElementById('works');
        const contact = document.getElementById('contact');
        const scrollPos = window.scrollY + 120; // offset for fixed header

        if (contact && scrollPos >= contact.offsetTop) {
          currentHash = '#contact';
        } else if (works && scrollPos >= works.offsetTop) {
          currentHash = '#works';
        } else {
          currentHash = '';
        }
      }

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        const [linkPath, linkHash] = href.split('#');
        const linkFile = linkPath.split('/').pop() || 'index.html';

        const isMatch =
          linkFile === currentPath && (!linkHash ? !currentHash : `#${linkHash}` === currentHash);

        link.classList.toggle('active', isMatch);
        if (isMatch) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    const setScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 30);
      updateActive();
    };
    window.addEventListener('scroll', setScroll);
    setScroll();
  })
  .catch(err => console.error('Header failed to load:', err));