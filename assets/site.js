document.querySelectorAll('.menu-btn').forEach(btn => btn.addEventListener('click', () => {
  const nav = document.querySelector('.nav-links');
  if (nav) nav.classList.toggle('open');
}));

// Open external web links in a new tab while keeping internal navigation in-place.
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('#')) return;

  try {
    const url = new URL(href, window.location.href);
    const isWebLink = url.protocol === 'http:' || url.protocol === 'https:';
    const isExternal = url.origin !== window.location.origin;

    if (isWebLink && isExternal) {
      link.target = '_blank';

      const rel = new Set((link.rel || '').split(/\s+/).filter(Boolean));
      rel.add('noopener');
      link.rel = [...rel].join(' ');
    }
  } catch (_) {
    // Ignore malformed URLs and leave the link unchanged.
  }
});
