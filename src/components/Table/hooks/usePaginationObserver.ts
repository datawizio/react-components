import { TableProps, TableState } from "../types";
import { useCallback, useEffect } from "react";

function usePaginationObserver(state: TableState, props: TableProps): void {
  const replaceFn = useCallback((str: string) => {
    return str
      ?.replace("21", "20")
      .replace("36", "35")
      .replace("51", "50")
      .replace("101", "100");
  }, []);

  useEffect(() => {
    // replace selected option value
    const paginationSelectionItems = document.querySelectorAll(
      ".dw-table-container .ant-pagination-options .ant-select-selector > span:last-child"
    );

    if (
      paginationSelectionItems?.length &&
      state.fixedTotal &&
      props.config?.fixed_total
    ) {
      paginationSelectionItems.forEach(item => {
        const newTitle = replaceFn(item.getAttribute("title"));
        if (newTitle) {
          item.setAttribute("title", newTitle);
          item.textContent = newTitle;
        }
      });
    }

    const callback = () => {
      if (!state.fixedTotal || !props.config?.fixed_total) return;

      // replace title (tooltip on hover)
      const paginationOptions = document.querySelectorAll(
        ".dw-table-container .ant-pagination-options .ant-select-dropdown .ant-select-item-option"
      );

      for (let i = 0; i < paginationOptions.length; i++) {
        let title = paginationOptions[i].getAttribute("title");
        paginationOptions[i].setAttribute("title", replaceFn(title));
      }

      // replace option values
      const paginationOptionsContent = document.querySelectorAll(
        ".dw-table-container .ant-pagination-options .ant-select-dropdown .ant-select-item-option .ant-select-item-option-content"
      );

      for (let i = 0; i < paginationOptionsContent.length; i++) {
        let text = paginationOptions[i].textContent;
        paginationOptions[i].textContent = replaceFn(text);
      }
    };

    const nodes = document.querySelectorAll(
      ".dw-table-container .ant-pagination-options"
    );

    if (nodes?.length && state.fixedTotal) {
      nodes.forEach(node => {
        let observer = new MutationObserver(callback);
        observer.observe(node, {
          childList: true,
          subtree: true
        });
      });
    }

    return () => {};
  }, [props.config, replaceFn, state.fixedTotal, state.pagination]);
}

usePaginationObserver.displayName = "usePaginationObserver";

export default usePaginationObserver;
