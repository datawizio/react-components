import { getBrowserName, getGeoLocation } from "./navigatorInfo";

const mockUserAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36";

const mockGeolocationData = {
  coords: {
    latitude: "47.49",
    longitude: "43.54"
  }
};

const mockGeolocation = {
  getCurrentPosition: jest.fn(callback => {
    callback(mockGeolocationData);
  }),
  watchPosition: jest.fn()
};
//@ts-ignore
window.navigator = {
  userAgent: mockUserAgent
};

global.navigator = {
  //@ts-ignore
  geolocation: mockGeolocation
};

describe("navigatorInfo", () => {
  it("getBrowserName", () => {
    const expectedResult = "Chrome 85.0";

    expect(getBrowserName()).toBe(expectedResult);
  });

  it("getGeoLocation", () => {
    let result;

    const callback = cord => {
      result = cord;
    };
    getGeoLocation(callback);

    expect(result).toEqual(mockGeolocationData.coords);
  });
});
