export type IDirection = "ltr" | "rtl" | undefined;

export const getLangsRTL = (): string[] => {
  return ["ar"];
};

export const getLangDirection = (locale): IDirection => {
  let direction: IDirection = "ltr";

  const rtlLangs = getLangsRTL();

  if (locale && rtlLangs.includes(locale.locale)) {
    direction = "rtl";
    setDirectionToHtml(direction);
  }

  return direction;
};

export const setDirectionToHtml = (direction: string): void => {
  const htmlTag = document.querySelector("html");
  if (htmlTag) {
    htmlTag.style.direction = direction;
    htmlTag.classList.add("rtl");
  }
};
