import countries from "./countries";
import {
  e164,
  parsePhoneNumber,
  generateNationalNumberDigits,
  getCountryForPartialE164Number,
  getNationalSignificantNumberDigits
} from "./phoneInputHelper";

const mockPhoneNumber = "+78555555555";

describe("Phone input helpers", () => {
  it("parsePhoneNumber", () => {
    const expectation = "RU";
    expect(parsePhoneNumber(mockPhoneNumber).country).toBe(expectation);
  });

  it("generateNationalNumberDigits", () => {
    const expectation = "88555555555";
    expect(
      generateNationalNumberDigits(parsePhoneNumber(mockPhoneNumber))
    ).toBe(expectation);
  });

  it("e164", () => {
    expect(e164(mockPhoneNumber, "RU")).toBe(mockPhoneNumber);
    expect(e164("123", "")).toBeUndefined();
    expect(e164("", "")).toBeUndefined();
    expect(e164("+", "")).toBeUndefined();
  });

  it("getCountryForPartialE164Number", () => {
    const USPhoneNumber = "1-541-754-3010";
    expect(
      getCountryForPartialE164Number(USPhoneNumber, "US", countries, false)
    ).toBe("US");
    expect(
      getCountryForPartialE164Number(mockPhoneNumber, "RU", countries, true)
    ).toBe("RU");
  });

  it("getNationalSignificantNumberDigits", () => {
    expect(getNationalSignificantNumberDigits(mockPhoneNumber, "RU")).toBe(
      "8555555555"
    );
  });
});
