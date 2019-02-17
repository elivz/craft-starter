import 'focus-visible';
import 'instant.page';
import 'intersection-observer';
import reframe from 'reframe.js/dist/reframe.es';
import './components/header';
import './lib/analytics';
import './plugins/external-links';
import './plugins/smooth-scroll';

// Make sure videos keep their aspect ratio
reframe('iframe:not(.no-reframe)');
