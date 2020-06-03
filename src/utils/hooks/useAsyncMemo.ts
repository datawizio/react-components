import { DependencyList, useEffect, useState } from "react";

function useAsyncMemo<T>(
  factory: () => Promise<T> | undefined | null,
  deps: DependencyList,
  initial: T = undefined
): T {
  const [val, setVal] = useState<T>(initial);

  useEffect(() => {
    let cancel = false;
    const promise = factory();

    if (promise === undefined || promise === null) return;

    promise.then(val => {
      if (!cancel) {
        setVal(val);
      }
    });

    return () => {
      cancel = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return val;
}

useAsyncMemo.displayName = "useAsyncMemo";

export default useAsyncMemo;
