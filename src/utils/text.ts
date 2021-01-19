import i18n from "i18next";

export function parseErrorText(errors: any) {
  return Object.keys(errors)
    .map(key => {
      return errors[key]
        .map((v: string) => {
          return i18n.t(v);
        })
        .join("<br />");
    })
    .join("<br />");
}

export const capitalize = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
