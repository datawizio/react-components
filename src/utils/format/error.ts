import ApiError from "../../components/ApiError";

export type ApiNotificationError = {
  error_title: string;
  error_type: "error" | "warning";
  error_field?: string;
  error_values?: string[];
};

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

export function showApiNotifications(errors: ApiNotificationError[], t: any, duration?: number) {
  if (!errors?.length) return;
  errors.forEach((error: ApiNotificationError) => {
    const { error_title, error_values, error_field, error_type } = error;
    const title: string = t(error_title, { column_name: error_field || "" });

    const description: string = error_values
      ?.map((value: string) => {
        return "<li>" + t(value) + "</li>";
      })
      .join("");

    ApiError.showNotification(
      title,
      description
        ? `<ul style='padding-left: 0; margin-bottom: 0;'>${description}</ul>`
        : null,
      error_type || "error",
      duration
    );
  });
}
