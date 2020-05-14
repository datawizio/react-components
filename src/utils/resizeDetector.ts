export default function resizeDetector(
  el: HTMLElement,
  onResize: (nextHeight: number, nextWidth: number) => void,
  checkInterval: number = 500
): () => void {
  let lastWidth;
  let lastHeight;

  const updateLastSize = () => {
    lastWidth = el.offsetWidth;
    lastHeight = el.offsetHeight;
  };

  updateLastSize();

  const resizeObserverInterval = setInterval(async () => {
    if (lastWidth !== el.offsetWidth || lastHeight !== el.offsetHeight) {
      await onResize(el.offsetHeight, el.offsetWidth);
      updateLastSize();
    }
  }, checkInterval);

  return () => clearInterval(resizeObserverInterval);
}
