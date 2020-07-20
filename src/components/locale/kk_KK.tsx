import { Locale } from "antd/es/locale-provider";

const DatePicker: any = {
  "lang": {
    "locale": "kk_KK",
    "placeholder": "Күнді таңдаңыз",
    "yearPlaceholder": "Жылды таңдаңыз",
    "quarterPlaceholder": "Тоқсанды таңдаңыз",
    "monthPlaceholder": "Айды таңдаңыз",
    "weekPlaceholder": "Апта таңдаңыз",
    "rangePlaceholder": ["Басталатын күн", "Аяқталу күні"],
    "rangeYearPlaceholder": ["Басталу жылы", "Жылдың соңы"],
    "rangeMonthPlaceholder": ["Айдың басталуы", "Аяқталған ай"],
    "rangeWeekPlaceholder": ["Апта басталады", "Апта соңы"],
    "today": "Бүгін",
    "now": "Енді",
    "backToToday": "Бүгінге оралыңыз",
    "ok": "Жарайды ма",
    "clear": "Айқын",
    "month": "Ай",
    "year": "Жыл",
    "timeSelect": "уақытты таңдаңыз",
    "dateSelect": "күнді таңдаңыз",
    "weekSelect": "Аптаны таңдаңыз",
    "monthSelect": "Айды таңдаңыз",
    "yearSelect": "Жыл таңдаңыз",
    "decadeSelect": "Онжылдықты таңдаңыз",
    "yearFormat": "YYYY",
    "dateFormat": "M/D/YYYY",
    "dayFormat": "D",
    "dateTimeFormat": "M/D/YYYY HH:mm:ss",
    "monthBeforeYear": true,
    "previousMonth": "Алдыңғы ай (PageUp)",
    "nextMonth": "Келесі ай (PageDown)",
    "previousYear": "Өткен жыл (Control + left)",
    "nextYear": "Келесі жыл (Control + right)",
    "previousDecade": "Соңғы онжылдық",
    "nextDecade": "Келесі онжылдық",
    "previousCentury": "Өткен ғасыр",
    "nextCentury": "Келесі ғасыр"
  },
  "timePickerLocale": {
    "placeholder": "Уақытты таңдаңыз",
    "rangePlaceholder": ["Басталу уақыты", "Аяқталу уақыты"]
  }
};

const localeValues: Locale = {
  "locale": "kk",
  "Pagination": {
    "items_per_page": "/ бет",
    "jump_to": "Бару",
    "jump_to_confirm": "растаңыз",
    "page": "",
    "prev_page": "Алдыңғы бет",
    "next_page": "Келесі бет",
    "prev_5": "Алдыңғы 5 бет",
    "next_5": "Келесі 5 бет",
    "prev_3": "Алдыңғы 3 бет",
    "next_3": "Келесі 3 бет"
  },
  "DatePicker": DatePicker,
  "TimePicker": {
    "placeholder": "Уақытты таңдаңыз",
    "rangePlaceholder": ["Басталу уақыты", "Аяқталу уақыты"]
  },
  "Calendar": DatePicker,
  "global": {
    "placeholder": "Таңдаңыз"
  },
  "Table": {
    "filterTitle": "Сүзгі мәзірі",
    "filterConfirm": "ЖАРАЙДЫ МА",
    "filterReset": "Қалпына келтіру",
    //@ts-ignore
    "filterEmptyText": "Сүзгілер жоқ",
    "selectAll": "Ағымдағы бетті таңдаңыз",
    "selectInvert": "Ағымдағы бетті аудару",
    "selectionAll": "Барлық деректерді таңдаңыз",
    "sortTitle": "Сұрыптау",
    "expand": "Жолды кеңейту",
    "collapse": "Жолды жию",
    "triggerDesc": "Сұрыптау тармағын таңдаңыз",
    "triggerAsc": "Сұрыптауды өсу бойынша нұқыңыз",
    "cancelSort": "Сұрыптауды болдырмау үшін нұқыңыз"
  },
  "Modal": {
    "okText": "ЖАРАЙДЫ МА",
    "cancelText": "Болдырмау",
    "justOkText": "ЖАРАЙДЫ МА"
  },
  "Popconfirm": {
    "okText": "ЖАРАЙДЫ МА",
    "cancelText": "Болдырмау"
  },
  "Transfer": {
    "titles": ["", ""],
    "searchPlaceholder": "Осы жерден іздеңіз",
    "itemUnit": "элемент",
    "itemsUnit": "заттар",
    "remove": "Алып тастаңыз",
    "selectCurrent": "Ағымдағы бетті таңдаңыз",
    "removeCurrent": "Ағымдағы бетті жою",
    "selectAll": "Барлық деректерді таңдаңыз",
    "removeAll": "Барлық деректерді жойыңыз",
    "selectInvert": "Ағымдағы бетті аудару"
  },
  "Upload": {
    "uploading": "Жүктелуде ...",
    "removeFile": "Файлды жою",
    "uploadError": "Жүктеу қатесі",
    "previewFile": "Алдын-ала қарау файлы",
    "downloadFile": "Файлды жүктеу"
  },
  "Empty": {
    "description": "Деректер жоқ"
  },
  "Icon": {
    "icon": "белгішесін басыңыз"
  },
  "Text": {
    "edit": "Өңдеу",
    "copy": "Көшіру",
    "copied": "Көшірілген",
    "expand": "Кеңейту"
  },
  "PageHeader": {
    "back": "Артқа"
  },
  "Form": {
    "defaultValidateMessages": {
      "default": "${label} өрісін тексеру қатесі",
      "required": "${label} енгізіңіз",
      "enum": "${label} [${enum}] біреуі болуы керек",
      "whitespace": "${label} бос таңба болмауы керек",
      "date": {
        "format": "${label} күн пішімі жарамсыз",
        "parse": "${label} күнге өзгертілмейді",
        "invalid": "${label} жарамсыз күн"
      },
      "types": {
        "string": "${label} жарамды ${type} емес",
        "method": "${label} жарамды ${type} емес",
        "array": "${label} жарамды ${type} емес",
        "object": "${label} жарамды ${type} емес",
        "number": "${label} жарамды ${type} емес",
        "date": "${label} жарамды ${type} емес",
        "boolean": "${label} жарамды ${type} емес",
        "integer": "${label} жарамды ${type} емес",
        "float": "${label} жарамды ${type} емес",
        "regexp": "${label} жарамды ${type} емес",
        "email": "${label} жарамды ${type} емес",
        "url": "${label} жарамды ${type} емес",
        "hex": "${label} жарамды ${type} емес"
      },
      "string": {
        "len": "${label} ${len} таңбаларынан тұруы керек",
        "min": "${label} кемінде ${min} таңбадан тұрады",
        "max": "${label} ${max} таңбаларына дейін",
        "range": "${label} ${min} - ${max} таңбалары арасында болуы керек"
      },
      "number": {
        "len": "${label} ${len} -ге тең болуы керек",
        "min": "${label} ең төменгі мәні - ${min}",
        "max": "${label} максималды мәні - ${max}",
        "range": "${label} ${min} - ${max} арасында болуы керек"
      },
      "array": {
        "len": "${len} ${label} болуы керек",
        "min": "Кем дегенде ${min} ${label}",
        "max": "Ең көбі ${max} ${label}",
        "range": "${label} мөлшері ${min} - ${max} арасында болуы керек"
      },
      "pattern": {
        "mismatch": "${label} үлгісі ${pattern} сәйкес келмейді"
      }
    }
  }
};
export default localeValues;
