export const TextValidator = {
  required(params: any, value: string) {
    const { message } = params;
    if (!value.trim().length) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  },

  maxLength(params: any, value: string) {
    const { message, max } = params;
    if (value.length > max) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  }
};
