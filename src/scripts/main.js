import 'focus-visible';
import 'instant.page';
import 'intersection-observer';
import reframe from 'reframe.js/dist/reframe.es';
import './components/header';
import './plugins/external-links';

// Make sure videos keep their aspect ratio
reframe('iframe:not(.no-reframe)');
