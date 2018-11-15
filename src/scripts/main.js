import /* webpackChunkName: "initial" */ 'lazysizes';
import reframe from 'reframe.js';
import '../styles/main.css';
import './components/header';
import './plugins/external-links';
import './plugins/smooth-scroll';

reframe('iframe:not(.no-reframe)');
