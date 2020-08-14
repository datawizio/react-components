import { useEffect } from "react";

function useScrollToTop() {
  useEffect(() => window.scrollTo(0, 0), []);
}

useScrollToTop.displayName = "useScrollToTop";

export default useScrollToTop;
