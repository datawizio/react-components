import ApiError from "../../components/ApiError";

export function parseErrorText(errors: any, t: any) {
  if (typeof errors === "string") {
    return t("ERROR_500");
  }

  if (errors.message) {
    return t(errors.message);
  }

  const msg = Object.keys(errors)
    .map(key => {
      return Array.isArray(errors[key])
        ? errors[key]
            .map((v: string) => {
              return t(v);
            })
            .join("<br />")
        : t(errors[key]);
    })
    .join("<br />");

  return msg;
}

export function showApiErrors(errors: any, t: any) {
  const msg = parseErrorText(errors, t);
  ApiError.showError(msg);
}
