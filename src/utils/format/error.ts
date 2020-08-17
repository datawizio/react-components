import ApiError from "../../components/ApiError";

export function parseErrorText(errors: any, t: any) {
  if (errors.message) {
    return t(errors.message);
  }
  const msg = Object.keys(errors)
    .map(key => {
      return errors[key]
        .map((v: string) => {
          return t(v);
        })
        .join("<br />");
    })
    .join("<br />");

  return msg;
}

export function showApiErrors(errors: any, t: any) {
  const msg = parseErrorText(errors, t);
  ApiError.showError(msg);
}
