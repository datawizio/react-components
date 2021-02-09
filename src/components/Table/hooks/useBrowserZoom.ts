/*
 * This hook is created for children columns of table
 * which are shifted in case browser viewport is zoomed
 * */

export const useBrowserZoom = () => {
  let pxRatio = window.devicePixelRatio;
  let zoomed = false;

  const alignChildrenCols = (
    top: number,
    addClass: boolean,
    removeClass: boolean
  ) => {
    const className = "th-child-mask";

    const thChildren = document.querySelectorAll(
      ".dw-table .ant-table-small thead tr:nth-child(2) .dw-table__column"
    );

    if (thChildren) {
      for (let i = 0; i < thChildren.length; i++) {
        // @ts-ignore
        thChildren[i].style.top = top + "px";
        addClass && thChildren[i].classList.add(className);
        removeClass && thChildren[i].classList.remove(className);
      }
    }
  };

  const onZoom = () => {
    const zoomPxRatio = window.devicePixelRatio;

    if (pxRatio === zoomPxRatio && zoomed) return;

    zoomed = true;
    pxRatio = zoomPxRatio;

    switch (zoomPxRatio.toFixed(2)) {
      case "1.00":
        alignChildrenCols(39, false, true);
        return;
      case "1.10":
        alignChildrenCols(37, false, true);
        return;
      case "1.25":
        alignChildrenCols(38, true, false);
        return;
      case "1.50":
        alignChildrenCols(39, true, false);
        return;
      default:
        alignChildrenCols(39, false, true);
    }
  };

  window.addEventListener("resize", onZoom);

  // TODO: run onZoom when the table is rendered
  onZoom();
};
