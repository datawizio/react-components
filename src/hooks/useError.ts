import { useState } from "react";

function useError() {
  const [a, setA] = useState<string | number>("a");
  //@ts-ignore
  window.forceError = () => {
    setA(1);
  };
  //@ts-ignore
  a.slice();
}

useError.displayName = "useError";

export default useError;
