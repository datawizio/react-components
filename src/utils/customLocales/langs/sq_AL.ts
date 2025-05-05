/* eslint-disable no-template-curly-in-string */
import Pagination from "../pagination/sq_AL";
import DatePicker from "../datePicker/sq_AL";
import TimePicker from "../timePicker/sq_AL";
import Calendar from "../calendar/sq_AL";

const typeTemplate = "${label} nuk është një ${type} e vlefshme";

const localeValues = {
  locale: "sq",
  Pagination: Pagination,
  DatePicker: DatePicker,
  TimePicker: TimePicker,
  Calendar: Calendar,
  global: {
    placeholder: "Ju lutemi zgjidhni"
  },
  Table: {
    filterTitle: "Menyja e filtrimit",
    filterConfirm: "OK",
    filterReset: "Rivendos",
    filterEmptyText: "Pa filtra",
    emptyText: "Nuk ka të dhëna",
    selectAll: "Zgjidh faqen aktuale",
    selectInvert: "Përmbys faqen aktuale",
    selectNone: "Fshi të gjitha të dhënat",
    selectionAll: "Zgjidh të gjitha të dhënat",
    sortTitle: "Rendit",
    expand: "Zgjero rreshtin",
    collapse: "Palos rreshtin",
    triggerDesc: "Kliko për të renditur në mënyrë zbritëse",
    triggerAsc: "Kliko për të renditur në mënyrë rritëse",
    cancelSort: "Kliko për të anuluar renditjen"
  },
  Modal: {
    okText: "OK",
    cancelText: "Anulo",
    justOkText: "OK"
  },
  Popconfirm: {
    okText: "OK",
    cancelText: "Anulo"
  },
  Transfer: {
    titles: ["", ""],
    searchPlaceholder: "Kërko këtu",
    itemUnit: "artikull",
    itemsUnit: "artikuj",
    remove: "Hiq",
    selectCurrent: "Zgjidh faqen aktuale",
    removeCurrent: "Hiq faqen aktuale",
    selectAll: "Zgjidh të gjitha të dhënat",
    removeAll: "Hiq të gjitha të dhënat",
    selectInvert: "Përmbys faqen aktuale"
  },
  Upload: {
    uploading: "Duke ngarkuar...",
    removeFile: "Hiq skedarin",
    uploadError: "Gabim gjatë ngarkimit",
    previewFile: "Parapamje e skedarit",
    downloadFile: "Shkarko skedarin"
  },
  Empty: {
    description: "Nuk ka të dhëna"
  },
  Icon: {
    icon: "ikonë"
  },
  Text: {
    edit: "Redakto",
    copy: "Kopjo",
    copied: "U kopjua",
    expand: "Zgjero"
  },
  PageHeader: {
    back: "Kthehu"
  },
  Form: {
    optional: "(opsionale)",
    defaultValidateMessages: {
      "default": "Gabim validimi për fushën ${label}",
      required: "Ju lutemi shkruani ${label}",
      "enum": "${label} duhet të jetë një nga [${enum}]",
      whitespace: "${label} nuk mund të përmbajë vetëm hapësira",
      date: {
        format: "Formati i datës për ${label} është i pavlefshëm",
        parse: "${label} nuk mund të konvertohet në një datë",
        invalid: "${label} është një datë e pavlefshme"
      },
      types: {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        "boolean": typeTemplate,
        integer: typeTemplate,
        "float": typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      string: {
        len: "${label} duhet të ketë ${len} karaktere",
        min: "${label} duhet të ketë të paktën ${min} karaktere",
        max: "${label} duhet të ketë deri në ${max} karaktere",
        range: "${label} duhet të ketë nga ${min} deri në ${max} karaktere"
      },
      number: {
        len: "${label} duhet të jetë i barabartë me ${len}",
        min: "${label} duhet të jetë minimumi ${min}",
        max: "${label} duhet të jetë maksimumi ${max}",
        range: "${label} duhet të jetë midis ${min}-${max}"
      },
      array: {
        len: "Duhet të jetë ${len} ${label}",
        min: "Të paktën ${min} ${label}",
        max: "Jo më shumë se ${max} ${label}",
        range: "Numri i ${label} duhet të jetë midis ${min}-${max}"
      },
      pattern: {
        mismatch: "${label} nuk përputhet me modelin ${pattern}"
      }
    }
  },
  Image: {
    preview: "Parapamje"
  }
};

export default localeValues;
