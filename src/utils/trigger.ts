export const triggerInputChangeValue = (
  input: HTMLInputElement,
  value: string
) => {
  var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    "value"
  ).set;
  nativeInputValueSetter.call(input, value);

  input.dispatchEvent(new Event("input", { "bubbles": true }));
};
