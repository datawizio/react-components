declare global {
  interface Window {
    theme: ITheme;
  }
}

export type ITheme = "dark" | "light";

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

export const changeTheme = (theme: ITheme) => {
  window.theme = theme;
  const allStyles: any = document.getElementsByTagName("link");
  const newHrefs: string[] = [];

  for (let style of allStyles) {
    if (style.getAttribute("rel") !== "stylesheet") continue;
    let href = style.getAttribute("href").split("/");
    if (theme === "light") {
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
  }, 500)
};

export const catchAppendStylesheet = () => {
  var f = Element.prototype.appendChild;
  //@ts-ignore
  Element.prototype.appendChild = function () {
    const element = arguments[0];
    if (
      element.nodeName.toLowerCase() === "link" &&
      !element.getAttribute("force")
    ) {
      let href = element.getAttribute("href").split("/");
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
