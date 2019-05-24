import loadScript from 'tiny-script-loader/loadScript';
import yall from 'yall-js';

function featureTest() {
  return 'IntersectionObserver' in window && 'Event' in window && 'assign' in Object;
}

function init() {
  yall({
    observeChanges: true,
  });
}

// See if we need to load polyfills first
if (featureTest()) {
  init();
} else {
  loadScript(
    'https://polyfill.io/v3/polyfill.min.js?features=Object.assign%2CEvent%2CIntersectionObserver',
    init
  );
}
