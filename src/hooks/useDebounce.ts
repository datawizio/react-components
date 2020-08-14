import { useRef, useCallback } from "react";

type DebounceFunction = (...args: any) => Promise<any>;

type TypeUseDebounce = (
  fn: (...args: any) => Promise<any>,
  time?: number
) => DebounceFunction;

export const useDebounce: TypeUseDebounce = (fn, time = 500) => {
  const timeout = useRef<any>(null);
  const debounce = useCallback(
    (...args: any) => {
      return new Promise(resolve => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(async () => {
          const result = await fn.apply(window, args);
          resolve(result);
        }, time);
      });
    },
    [fn, time]
  );

  return debounce;
};
