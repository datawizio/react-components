import { isCheckDisabled, toArray } from "./valueUtil";

describe("Value utils", () => {
  it("toArray util (array)", () => {
    const payload = [1, 3, 5];
    const expectation = [];

    expect(toArray(payload)).toEqual(payload);
  });
  it("toArray util (value)", () => {
    const payload = 1;
    const expectation = [1];

    expect(toArray(payload)).toEqual(expectation);
  });

  it("toArray util (undefined)", () => {
    const payload = undefined;
    const expectation = [];

    expect(toArray(payload)).toEqual(expectation);
  });

  it("isCheckDisabled util (expectation false)", () => {
    const payload = {
      disabled: true,
      disableCheckbox: false,
      checkable: false
    };

    expect(isCheckDisabled(payload)).toBeFalsy();
  });

  it("isCheckDisabled util (expectation true)", () => {
    const payload = {
      disabled: true,
      disableCheckbox: true,
      checkable: false
    };

    expect(isCheckDisabled(payload)).toBeTruthy();
  });
});
