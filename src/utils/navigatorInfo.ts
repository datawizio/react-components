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

export function isSafari() {
  return getBrowserName().includes("Safari");
}

export function isChrome() {
  return getBrowserName().includes("Chrome");
}

export function getOS() {
  const navigator = window.navigator;
  const userAgent = navigator.userAgent;

  // @ts-ignore
  const platform = navigator?.userAgentData?.platform || navigator.platform;

  const macosPlatforms = ["Macintosh", "MacIntel", "MacPPC", "Mac68K"];
  const windowsPlatforms = ["Win32", "Win64", "Windows", "WinCE"];
  const iosPlatforms = ["iPhone", "iPad", "iPod"];

  let os = "";

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = "MAC_OS";
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = "IOS";
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = "WINDOWS";
  } else if (/Android/.test(userAgent)) {
    os = "ANDROID";
  } else if (/Linux/.test(platform)) {
    os = "LINUX";
  }

  return os;
}

export function isIOS() {
  return getOS().includes("IOS");
}

export function isAndroid() {
  return getOS().includes("ANDROID");
}
