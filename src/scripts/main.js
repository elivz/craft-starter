import 'focus-visible';
import 'intersection-observer';
import quicklink from 'quicklink';
import reframe from 'reframe.js/dist/reframe.es';
import './components/header';
import './plugins/external-links';
import './plugins/smooth-scroll';

// Preload links in the viewport
quicklink();

// Make sure videos keep their aspect ratio
reframe('iframe:not(.no-reframe)');
