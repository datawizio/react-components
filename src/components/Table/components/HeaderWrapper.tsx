import React from "react";

export const HeaderWrapper = ({ className, children }) => {
  //TOTO
  return (
    <table>
      <thead className={className}>{children}</thead>
    </table>
  );
};
