/*
const translate = require("@k3rn31p4nic/google-translate-api");
const defaultLang = require("../src/components/locale/default");
const fs = require("fs");

const texts = {};

async function getAllTexts(obj) {
  if (typeof obj === "string") {
    texts[obj] = "";
    return;
  }
  if (typeof obj === "boolean") {
    return;
  }
  if (!obj) {
    return;
  }
  if (Array.isArray(obj)) {
    obj.forEach(async item => {
      getAllTexts(item);
    });
  }
  const keys = Object.keys(obj);
  keys.forEach(key => {
    getAllTexts(obj[key]);
  });
}

async function translateAllTexts() {
  const keys = Object.keys(texts);
  let count = keys.length;
  return new Promise(resolve => {
    keys.forEach(async key => {
      texts[key] = await trans(key);
      count--;
      if (count === 0) resolve();
    });
  });
}

function goIntoObj(obj) {
  const o = {};
  const keys = Object.keys(obj);
  keys.forEach(key => {
    o[key] = goInto(obj[key]);
  });
  return o;
}

function goIntoArray(obj) {
  const arr = [];
  obj.forEach(item => {
    arr.push(goInto(item));
  });
  return arr;
}

function goInto(obj) {
  if (typeof obj === "string") {
    return texts[obj];
  }
  if (typeof obj === "boolean") {
    return obj;
  }
  if (!obj) {
    return "";
  }
  if (Array.isArray(obj)) {
    return goIntoArray(obj);
  }
  return goIntoObj(obj);
}

async function trans(str) {
  return new Promise(async resolve => {
    const res = await translate(str, { to: lang });
    resolve(res.text);
  });
}

function writeResult(res) {
  let str = JSON.stringify(res, null, "  ");
  str = `import { Locale } from "antd/es/locale-provider";const localeValues : Locale = ${str}; export default localeValues;`;

  fs.writeFile(`src/components/locale/${locale}.tsx`, str, "utf8", callback);
}

const args = process.argv.slice(2);
const locale = args[0];
const lang = args[1] ? args[1] : args[0].split("_")[0];

const callback = () => {};

getAllTexts(defaultLang);
translateAllTexts().then(() => {
  const res = goInto(defaultLang);
  writeResult(res);
});
*/
