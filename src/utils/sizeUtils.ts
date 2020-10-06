export function getAbsoluteHeight(el: HTMLElement) {
  var styles = window.getComputedStyle(el);

  var margin =
    parseFloat(styles["marginTop"]) + parseFloat(styles["marginBottom"]);

  return Math.ceil(el.offsetHeight + margin);
}

export function getAbsoluteWidth(el: HTMLElement) {
  var styles = window.getComputedStyle(el);

  var margin =
    parseFloat(styles["marginLeft"]) + parseFloat(styles["marginRight"]);

  return Math.ceil(el.offsetWidth + margin);
}
