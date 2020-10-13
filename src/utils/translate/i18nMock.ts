import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const copyrightEng = {
  COPYRIGHT: "Copyright {{year}}"
};
export const translationsEng = {
  ACTIVE_SHOPS_QTY: "Active shops Qty",
  ACTIVE_SKU_QTY: "Active SKU Qty",
  ACTIVITY_GROUP: "Activity",
  ACTIVITY_TYPE: "Activity type",
  ADD_VISUALISATION: "Add visualization",
  ALLOWED_APPS: "Available applications",
  ALLOWED_EXTENSIONS: "Available Extensions",
  ANALYTICS_BLOCK: "Analytics",
  APPLY: "Apply",
  ALL: "All"
};

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",

  // have a common namespace used around the full app
  ns: ["translations"],
  defaultNS: "translations",

  debug: true,

  interpolation: {
    escapeValue: false // not needed for react!!
  },

  resources: {
    en: {
      translations: { ...translationsEng, ...copyrightEng }
    }
  }
});

export default i18n;
