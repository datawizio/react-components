export interface ILocaleList {
  [key: string]: {
    name: string;
    getAnt: () => Promise<any>;
    getDayJs: () => Promise<any>;
  };
}

export const locales: ILocaleList = {
  uk: {
    name: "uk_UA",
    getAnt: () => import("antd/es/locale/uk_UA"),
    getDayJs: () => import("dayjs/locale/uk")
  },
  ru: {
    name: "ru_RU",
    getAnt: () => import("antd/es/locale/ru_RU"),
    getDayJs: () => import("dayjs/locale/ru")
  },
  en: {
    name: "en_US",
    getAnt: () => import("antd/es/locale/en_US"),
    getDayJs: () => import("dayjs/locale/en")
  },
  "zh-hans": {
    name: "zh_CN",
    getAnt: () => import("antd/es/locale/zh_CN"),
    getDayJs: () => import("dayjs/locale/zh-cn")
  },
  "zh-hant": {
    name: "zh_TW",
    getAnt: () => import("antd/es/locale/zh_TW"),
    getDayJs: () => import("dayjs/locale/zh-tw")
  },
  ka: {
    name: "ka_KA",
    getAnt: () => import("../../components/locale/ka_KA"),
    getDayJs: () => import("dayjs/locale/ka")
  },
  ro: {
    name: "ro_RO",
    getAnt: () => import("antd/es/locale/ro_RO"),
    getDayJs: () => import("dayjs/locale/en")
  },
  de: {
    name: "de_DE",
    getAnt: () => import("antd/es/locale/de_DE"),
    getDayJs: () => import("dayjs/locale/de")
  },
  tr: {
    name: "tr_TR",
    getAnt: () => import("antd/es/locale/tr_TR"),
    getDayJs: () => import("dayjs/locale/tr")
  },
  lt: {
    name: "lt_LT",
    getAnt: () => import("../../components/locale/lt_LT"),
    getDayJs: () => import("dayjs/locale/lt")
  },
  lv: {
    name: "lv_LV",
    getAnt: () => import("antd/es/locale/lv_LV"),
    getDayJs: () => import("dayjs/locale/lv")
  },
  es: {
    name: "es_ES",
    getAnt: () => import("antd/es/locale/es_ES"),
    getDayJs: () => import("dayjs/locale/es")
  },
  kk: {
    name: "kk_KK",
    getAnt: () => import("../../components/locale/kk_KK"),
    getDayJs: () => import("dayjs/locale/kk")
  },
  ms: {
    name: "ms_MY",
    getAnt: () => import("antd/es/locale/ms_MY"),
    getDayJs: () => import("dayjs/locale/ms")
  },
  et: {
    name: "et_EE",
    getAnt: () => import("antd/es/locale/et_EE"),
    getDayJs: () => import("dayjs/locale/et")
  },
  ja: {
    name: "ja_JP",
    getAnt: () => import("antd/es/locale/ja_JP"),
    getDayJs: () => import("dayjs/locale/ja")
  },
  pt: {
    name: "pt_PT",
    getAnt: () => import("antd/es/locale/pt_PT"),
    getDayJs: () => import("dayjs/locale/pt")
  },
  ar: {
    name: "ar_EG",
    getAnt: () => import("antd/es/locale/ar_EG"),
    getDayJs: () => import("dayjs/locale/ar")
  },
  ko: {
    name: "ko_KR",
    getAnt: () => import("antd/es/locale/ko_KR"),
    getDayJs: () => import("dayjs/locale/ko")
  },
  vi: {
    name: "vi_VN",
    getAnt: () => import("antd/es/locale/vi_VN"),
    getDayJs: () => import("dayjs/locale/vi")
  },
  fr: {
    name: "fr_FR",
    getAnt: () => import("antd/es/locale/fr_FR"),
    getDayJs: () => import("dayjs/locale/fr")
  },
  hr: {
    name: "hr_HR",
    getAnt: () => import("antd/es/locale/hr_HR"),
    getDayJs: () => import("dayjs/locale/hr")
  },
  ba: {
    name: "en_US",
    getAnt: () => import("antd/es/locale/en_US"),
    getDayJs: () => import("dayjs/locale/en")
  },
  pl: {
    name: "pl_PL",
    getAnt: () => import("antd/es/locale/pl_PL"),
    getDayJs: () => import("dayjs/locale/pl")
  },
};

export const defaultLangs = new Set([
  "en",
  "ru",
  "uk",
  "zh-hans",
  "zh-hant",
  "ka",
  "ro",
  "de",
  "tr",
  "lt",
  "lv",
  "es",
  "kk",
  "ms",
  "et",
  "ja",
  "pt",
  "ar",
  "ko",
  "vi",
  "fr",
  "hr",
  "ba",
  "pl"
]);
