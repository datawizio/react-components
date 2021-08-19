declare global {
  interface Window {
    theme: ITheme;
  }
}

export type ITheme = "dark" | "light" | "system";

window.theme = "light";

const removeAllOldStyles = () => {
  const allStyles: any = document.getElementsByTagName("link");
  let j = 0;
  for (var i = allStyles.length - 1; i >= 0; i--) {
    if (allStyles[j].getAttribute("old")) {
      allStyles[j].parentNode.removeChild(allStyles[j]);
    } else {
      j++;
    }
  }
};

export const changeThemeHandler = (e: any) => {
  changeTheme(e.matches ? "dark" : "light", true);
  window.location.reload();
};

export const changeTheme = (theme: ITheme, fromHandler = false) => {
  const httpSet = new Set(["http", "https"]);
  const matchMediaDark =
    window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");

  if (theme === "system") {
    const isSystemDark = matchMediaDark.matches;
    theme = isSystemDark ? "dark" : "light";
    matchMediaDark.addEventListener("change", changeThemeHandler);
  } else {
    !fromHandler &&
      matchMediaDark.removeEventListener("change", changeThemeHandler);
  }

  window.theme = theme;
  localStorage.setItem("theme", theme);

  const allStyles: any = document.getElementsByTagName("link");
  const newHrefs: string[] = [];

  for (let style of allStyles) {
    if (style.getAttribute("rel") !== "stylesheet") continue;
    let href = style.getAttribute("href").split("/");
    if (httpSet.has(href[0]) && href[2] !== window.location.hostname) {
      newHrefs.push(href.join("/"));
    } else if (theme === "light") {
      href = href.filter((i: string) => i !== "dark");
    } else {
      const index = href.indexOf("dist");
      href.splice(index, 0, "dark");
    }
    style.setAttribute("old", "true");
    newHrefs.push(href.join("/"));
  }

  newHrefs.forEach(href => {
    const link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", href);
    link.setAttribute("force", "true");
    document.getElementsByTagName("head")[0].appendChild(link);
  });

  setTimeout(() => {
    removeAllOldStyles();
  }, 500);
};

export const catchAppendStylesheet = () => {
  var f = Element.prototype.appendChild;
  const httpSet = new Set(["http", "https"]);
  //@ts-ignore
  Element.prototype.appendChild = function () {
    const element = arguments[0];
    if (
      element.nodeName.toLowerCase() === "link" &&
      !element.getAttribute("force")
    ) {
      let href = element.getAttribute("href").split("/");

      if (httpSet.has(href[0]) && href[2] !== window.location.hostname) {
        f.apply(this, arguments);
        return;
      }

      if (window.theme === "light") {
        href = href.filter((i: string) => i !== "dark");
      } else {
        const index = href.indexOf("dist");
        href.splice(index, 0, "dark");
      }
      element.setAttribute("href", href.join("/"));
      f.apply(this, [element]);
      return;
    }
    //@ts-ignore
    f.apply(this, arguments);
  };
};
