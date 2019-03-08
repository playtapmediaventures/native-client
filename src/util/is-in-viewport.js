export default function isInViewport(el, [width, height] = [0, 0], offset = 0) {
  if (!el || el.nodeType !== 1) {
    return false;
  }
  const clientRect = el.getBoundingClientRect();

  const viewport = {
    top: 0,
    left: 0,
    bottom: window.innerHeight,
    right: window.innerWidth
  };

  const inViewport =
    clientRect.bottom >= viewport.top + height * offset &&
    clientRect.right >= viewport.left + width * offset &&
    clientRect.top <= viewport.bottom - height * offset &&
    clientRect.left <= viewport.right - width * offset;

  return inViewport;
}
