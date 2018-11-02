import SweetScroll from 'sweet-scroll';

// Initialize smooth-scroll
new SweetScroll({
  trigger: 'a[href^="#"]:not(.no-smooth-scroll)',
  header: '#header',
  updateURL: true,
});
