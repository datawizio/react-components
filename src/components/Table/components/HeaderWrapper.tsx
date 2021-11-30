import React from "react";

export const HeaderWrapper = ({ className, children }) => {
  return (
    <table>
      <thead className={className}>{children}</thead>
    </table>
  );
};
