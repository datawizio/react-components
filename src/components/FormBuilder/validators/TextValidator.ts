import i18n from "i18next";

export const TextValidator = {
  required(params: any, value: string) {
    const { message } = params;
    if (!value.trim().length) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  },

  maxLength(params: any, value: string) {
    const MAX_DEFAULT = 200;
    let { message, max } = params;
    if (!max) max = MAX_DEFAULT;
    if (!message)
      message = i18n.t("NAME_SHOULD_BE_LESS_THEN", {
        maxCount: max
      });
    if (value.length > max) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  }
};
