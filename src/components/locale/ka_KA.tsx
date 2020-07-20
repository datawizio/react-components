import { Locale } from "antd/es/locale-provider";
const DatePicker: any = {
  "lang": {
    "locale": "ka_KA",
    "placeholder": "აირჩიეთ თარიღი",
    "yearPlaceholder": "აირჩიეთ წელი",
    "quarterPlaceholder": "აირჩიეთ კვარტალი",
    "monthPlaceholder": "აირჩიეთ თვე",
    "weekPlaceholder": "აირჩიეთ კვირა",
    "rangePlaceholder": ["Დაწყების თარიღი", "Დასრულების თარიღი"],
    "rangeYearPlaceholder": ["დაწყების წელი", "ბოლო წელი"],
    "rangeMonthPlaceholder": ["თვის დაწყება", "ბოლო თვე"],
    "rangeWeekPlaceholder": ["დაწყების კვირა", "კვირის ბოლო"],
    "today": "დღეს",
    "now": "ახლა",
    "backToToday": "დაუბრუნდით დღეს",
    "ok": "Კარგი",
    "clear": "ნათელია",
    "month": "თვე",
    "year": "წელი",
    "timeSelect": "აირჩიეთ დრო",
    "dateSelect": "აირჩიეთ თარიღი",
    "weekSelect": "აირჩიეთ კვირა",
    "monthSelect": "შეარჩიე თვე",
    "yearSelect": "აირჩიეთ წელი",
    "decadeSelect": "შეარჩიე ათწლეული",
    "yearFormat": "YYYY",
    "dateFormat": "M/D/YYYY",
    "dayFormat": "D",
    "dateTimeFormat": "M/D/YYYY HH:mm:ss",
    "monthBeforeYear": true,
    "previousMonth": "წინა თვე (PageUp)",
    "nextMonth": "შემდეგი თვე (PageDown)",
    "previousYear": "გასულ წელს (Control + left)",
    "nextYear": "შემდეგ წელს (Control + right)",
    "previousDecade": "ბოლო ათწლეული",
    "nextDecade": "შემდეგი ათწლეული",
    "previousCentury": "Ბოლო საუკუნე",
    "nextCentury": "შემდეგი საუკუნე"
  },
  "timePickerLocale": {
    "placeholder": "აირჩიეთ დრო",
    "rangePlaceholder": ["დაწყების დრო", "Დროის დასასრული"]
  }
};

const typeTemplate = "${label} არ არის სწორი ${type}";

const localeValues: Locale = {
  "locale": "ka",
  "Pagination": {
    "items_per_page": "/ გვერდი",
    "jump_to": "Წადი",
    "jump_to_confirm": "დაადასტუროს",
    "page": "",
    "prev_page": "Წინა გვერდი",
    "next_page": "Შემდეგი გვერდი",
    "prev_5": "წინა 5 გვერდი",
    "next_5": "შემდეგი 5 გვერდი",
    "prev_3": "წინა 3 გვერდი",
    "next_3": "შემდეგი 3 გვერდი"
  },
  "DatePicker": DatePicker,
  "TimePicker": {
    "placeholder": "აირჩიეთ დრო",
    "rangePlaceholder": ["დაწყების დრო", "Დროის დასასრული"]
  },
  "Calendar": DatePicker,
  "global": {
    "placeholder": "გთხოვთ აირჩიოთ"
  },
  "Table": {
    "filterTitle": "ფილტრის მენიუ",
    "filterConfirm": "კარგი",
    "filterReset": "გადატვირთვა",
    //@ts-ignore
    "filterEmptyText": "ფილტრები არ არის",
    "selectAll": "აირჩიეთ მიმდინარე გვერდი",
    "selectInvert": "ინვერტული მიმდინარე გვერდი",
    "selectionAll": "აირჩიეთ ყველა მონაცემი",
    "sortTitle": "დალაგება",
    "expand": "გაფართოების რიგი",
    "collapse": "ჩამონგრევის რიგი",
    "triggerDesc": "დააჭირეთ დალაგების დალაგების მიხედვით",
    "triggerAsc": "დააჭირეთ დახარისხება ასვლის მიხედვით",
    "cancelSort": "დააჭირეთ დახარისხების გაუქმებას"
  },
  "Modal": {
    "okText": "კარგი",
    "cancelText": "გაუქმება",
    "justOkText": "კარგი"
  },
  "Popconfirm": {
    "okText": "კარგი",
    "cancelText": "გაუქმება"
  },
  "Transfer": {
    "titles": ["", ""],
    "searchPlaceholder": "Აქ მოძებნე",
    "itemUnit": "ნივთი",
    "itemsUnit": "საგნები",
    "remove": "ამოიღეთ",
    "selectCurrent": "აირჩიეთ მიმდინარე გვერდი",
    "removeCurrent": "წაშალეთ მიმდინარე გვერდი",
    "selectAll": "აირჩიეთ ყველა მონაცემი",
    "removeAll": "ამოიღეთ ყველა მონაცემი",
    "selectInvert": "ინვერტული მიმდინარე გვერდი"
  },
  "Upload": {
    "uploading": "ატვირთვა ...",
    "removeFile": "ფაილის წაშლა",
    "uploadError": "შეცდომა შეცდომა",
    "previewFile": "გადახედვის ფაილი",
    "downloadFile": "Გადმოწერეთ ფაილი"
  },
  "Empty": {
    "description": "Მონაცემები არ არის"
  },
  "Icon": {
    "icon": "ხატი"
  },
  "Text": {
    "edit": "რედაქტირება",
    "copy": "დააკოპირეთ",
    "copied": "გადაწერა",
    "expand": "გაფართოება"
  },
  "PageHeader": {
    "back": "უკან"
  },
  "Form": {
    "defaultValidateMessages": {
      "default": "საველე ვალიგების შეცდომა ${label}",
      "required": "გთხოვთ, შეიყვანოთ ${label}",
      "enum": "${label} უნდა იყოს ერთ-ერთი [${enum}]",
      "whitespace": "${label} არ შეიძლება იყოს ცარიელი სიმბოლო",
      "date": {
        "format": "${label} თარიღის ფორმა არასწორია",
        "parse": "${label} ვერ გადაკეთდება თარიღად",
        "invalid": "${label} არასწორი თარიღია"
      },
      "types": {
        string: typeTemplate,
        method: typeTemplate,
        array: typeTemplate,
        object: typeTemplate,
        number: typeTemplate,
        date: typeTemplate,
        boolean: typeTemplate,
        integer: typeTemplate,
        float: typeTemplate,
        regexp: typeTemplate,
        email: typeTemplate,
        url: typeTemplate,
        hex: typeTemplate
      },
      "string": {
        "len": "${label} უნდა იყოს ${len} სიმბოლო",
        "min": "${label} least მინიმუმ ${min} სიმბოლო",
        "max": "${label} მდე ${max} სიმბოლო",
        "range": "${label} უნდა იყოს ${min} - ${max} სიმბოლოებს შორის"
      },
      "number": {
        "len": "${label} უნდა იყოს ტოლი ${len}",
        "min": "${label} მინიმალური მნიშვნელობა ${min}",
        "max": "${label} მაქსიმალური მნიშვნელობა ${max}",
        "range": "${label} უნდა იყოს ${min} - ${max}"
      },
      "array": {
        "len": "უნდა იყოს ${len} ${label}",
        "min": "მინიმუმ ${min} ${label}",
        "max": "მაქსიმუმ ${max} ${label}",
        "range": "${label} amount ღირებულება უნდა იყოს ${min} - ${max}"
      },
      "pattern": {
        "mismatch": "${label} არ შეესაბამება შაბლონს ${pattern}"
      }
    }
  }
};
export default localeValues;
