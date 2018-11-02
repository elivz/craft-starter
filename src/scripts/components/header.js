import Toggle from 'accessible-toggle';
import throttle from 'raf-throttle';
import { $ } from '../lib/domUtils';

// Add class to header when scrolled down
const checkScroll = throttle(() => {
  document.body.classList.toggle('is-scrolled', window.scrollY > 50);
});
window.addEventListener('scroll', checkScroll);

// Toggle the primary nav on mobile
const headerNav = $('#header-nav');
if (headerNav) {
  new Toggle(headerNav, {
    trapFocus: true,
    assignFocus: true,
  });
}
