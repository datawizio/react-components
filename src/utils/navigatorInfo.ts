export function getBrowserName() {
  var regexps: any = {
      "Chrome": [/Chrome\/(\S+)/],
      "Firefox": [/Firefox\/(\S+)/],
      "MSIE": [/MSIE (\S+);/],
      "Opera": [
        /Opera\/.*?Version\/(\S+)/ /* Opera 10 */,
        /Opera\/(\S+)/ /* Opera 9 and older */
      ],
      "Safari": [/Version\/(\S+).*?Safari\//]
    },
    re,
    m,
    browser,
    version;

  const userAgent = window.navigator.userAgent;
  const elements = 1;
  for (browser in regexps) {
    while ((re = regexps[browser].shift()))
      if ((m = userAgent.match(re))) {
        //@ts-ignore
        version = m[1].match(
          new RegExp("[^.]+(?:.[^.]+){0," + elements + "}")
        )[0];
        return browser + " " + version;
      }
  }
  return "unknown";
}

export function getGeoLocation(callback: (pos: any) => void) {
  navigator.geolocation &&
  navigator.geolocation.getCurrentPosition(pos => {
    callback({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    });
  });
}
