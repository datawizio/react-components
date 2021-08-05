export default function resizeDetector(
  el: HTMLElement,
  onResize: (nextHeight: number, nextWidth: number) => void,
  checkInterval: number = 500
): () => void {
  let lastWidth: number;
  let lastHeight: number;

  const updateLastSize = () => {
    lastWidth = el.offsetWidth;
    lastHeight = el.offsetHeight;
  };

  const notifyListener = async () => {
    if (el.offsetWidth === 0) return;
    await onResize(el.offsetHeight, el.offsetWidth);
  };

  const frame = () => {
    notifyListener();
    updateLastSize();
  };

  frame();

  const resizeObserverInterval = setInterval(async () => {
    if (lastWidth !== el.offsetWidth || lastHeight !== el.offsetHeight) {
      frame();
    }
  }, checkInterval);

  return () => clearInterval(resizeObserverInterval);
}
