import ApiError from "../../components/ApiError";

export function parseErrorText(errors: any, t: any) {
  if (Array.isArray(errors)) {
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
  if (errors.message) {
    return t(errors.message);
  }
}

export function showApiErrors(errors: any, t: any) {
  const msg = parseErrorText(errors, t);
  ApiError.showError(msg);
}
