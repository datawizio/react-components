export function getAbsoluteHeight(el: HTMLElement) {
  const styles = window.getComputedStyle(el);

  const margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(el.offsetHeight + margin);
}

export function getAbsoluteWidth(el: HTMLElement) {
  const styles = window.getComputedStyle(el);

  const margin =
    parseFloat(styles["marginLeft"]) + parseFloat(styles["marginRight"]);

  return Math.ceil(el.offsetWidth + margin);
}
