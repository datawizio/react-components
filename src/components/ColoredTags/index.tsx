import React from "react";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

import "./index.less";

const tagColors = [
  { color: "#199605", backgroundColor: "#ecfdec" },
  { color: "#393939", backgroundColor: "#efefef" },
  { color: "#4a72ff", backgroundColor: "#f2f5ff" },
  { color: "#ffa73f", backgroundColor: "#fff7e2" }
];

type ColoredTagsProps = React.HTMLAttributes<HTMLDivElement> & {
  startIndex?: number;
  suffix?: React.ReactNode;
};

const ColoredTags: React.FC<ColoredTagsProps> = ({
  children,
  className,
  startIndex = 0,
  suffix,
  ...props
}) => {
  const { t } = useTranslation();
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={clsx("colored-tags", className)} {...props}>
      {!childrenArray.length ? (
        <div className="colored-tag not-selected-tag">{t("NOT_SELECTED")}</div>
      ) : (
        childrenArray.map((tagBody, i) => (
          <div
            key={`colored-tag-${i}`}
            className="colored-tag"
            style={tagColors[(i + startIndex) % tagColors.length]}
          >
            {tagBody}
          </div>
        ))
      )}
      <div className="colored-tags-suffix">{suffix}</div>
    </div>
  );
};

export default ColoredTags;
