import { $, $$, closest } from '../lib/domUtils';

const hoverTime = 200;
const fetchers = [];

function prerender(url) {
  const head = $('head');
  const refs = head.childNodes;
  const ref = refs[refs.length - 1];

  $$('link', head).forEach(el => {
    if ('rel' in el && (el.rel === 'prerender' || el.rel === 'prefetch')) {
      el.parentNode.removeChild(el);
    }
  });

  const prerenderTag = document.createElement('link');
  prerenderTag.rel = 'prerender';
  prerenderTag.href = url;
  ref.parentNode.insertBefore(prerenderTag, ref);

  const prefetchTag = document.createElement('link');
  prefetchTag.rel = 'prefetch';
  prefetchTag.href = url;
  ref.parentNode.insertBefore(prefetchTag, ref);
}

function cleanup(event) {
  const element = event.target;
  clearTimeout(fetchers[element.href]);
  element.removeEventListener('mouseleave', cleanup);
}

document.addEventListener('mouseover', event => {
  const link = event.target.tagName === 'A' ? event.target : closest(event.target, 'a');
  if (link && link.href) {
    const url = link.href;
    cleanup(event);
    link.addEventListener('mouseleave', cleanup);
    fetchers[url] = setTimeout(() => prerender(url), hoverTime);
  }
});
