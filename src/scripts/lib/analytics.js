/* globals ga */

import loadScript from 'tiny-script-loader/loadScript';
import 'autotrack/lib/plugins/clean-url-tracker';
import 'autotrack/lib/plugins/event-tracker';
import 'autotrack/lib/plugins/outbound-link-tracker';

if (typeof window.gaId !== 'undefined' && typeof window.ga === 'undefined') {
  loadScript('https://www.google-analytics.com/analytics.js');

  ga('create', window.gaId, 'auto');
  ga('require', 'eventTracker');
  ga('require', 'outboundLinkTracker');
  ga('send', 'pageview');

  window.addEventListener('error', e => {
    ga('send', 'event', 'JS Error', e.message, `${e.filename}: ${e.lineno}`);
  });
}

export default function trackEvent(
  eventCategory,
  eventAction,
  eventLabel = null,
  eventValue = null
) {
  if (typeof window.ga !== 'undefined') {
    ga('send', 'event', eventCategory, eventAction, eventLabel, eventValue);
  }
}
