import { Locale } from "antd/es/locale-provider";
const type = "${label} negalioja ${type}";
const DatePicker: any = {
  "lang": {
    "locale": "lt_LT",
    "placeholder": "Pasirinkite datą",
    "yearPlaceholder": "Pasirinkite metus",
    "quarterPlaceholder": "Pasirinkite ketvirtį",
    "monthPlaceholder": "Pasirinkite mėnesį",
    "weekPlaceholder": "Pasirinkite savaitę",
    "rangePlaceholder": ["Pradžios data", "Pabaigos data"],
    "rangeYearPlaceholder": ["Pradžios metai", "Metų pabaiga"],
    "rangeMonthPlaceholder": ["Pradėti mėnesį", "Mėnesio pabaiga"],
    "rangeWeekPlaceholder": ["Pradėti savaitę", "Savaitės pabaiga"],
    "today": "Šiandien",
    "now": "Dabar",
    "backToToday": "Grįžti į šiandienę",
    "ok": "Gerai",
    "clear": "Aišku",
    "month": "Mėnuo",
    "year": "Metai",
    "timeSelect": "pasirinkti laiką",
    "dateSelect": "pasirinkite datą",
    "weekSelect": "Pasirinkite savaitę",
    "monthSelect": "Pasirinkite mėnesį",
    "yearSelect": "Pasirinkite metus",
    "decadeSelect": "Pasirinkite dešimtmetį",
    "yearFormat": "YYYY",
    "dateFormat": "M/D/YYYY",
    "dayFormat": "D",
    dateTimeFormat: "M/D/YYYY HH:mm:ss",
    "monthBeforeYear": true,
    "previousMonth": "Ankstesnis mėnuo (PageUp)",
    "nextMonth": "Kitas mėnuo (PageDown)",
    "previousYear": "Praėjusiais metais (Control + left)",
    "nextYear": "Kitais metais (Control + right)",
    "previousDecade": "Paskutinis dešimtmetis",
    "nextDecade": "Kitas dešimtmetis",
    "previousCentury": "Praėjęs amžius",
    "nextCentury": "Kitas amžius"
  },
  "timePickerLocale": {
    "placeholder": "Pasirinkite laiką",
    "rangePlaceholder": ["Pradžios laikas", "Pabaigos laikas"]
  }
};

const localeValues: Locale = {
  "locale": "lt",
  "Pagination": {
    "items_per_page": "/ puslapis",
    "jump_to": "Eiti į",
    "jump_to_confirm": "patvirtinti",
    "page": "",
    "prev_page": "Ankstesnis puslapis",
    "next_page": "Kitas puslapis",
    "prev_5": "Ankstesni 5 puslapiai",
    "next_5": "Kiti 5 puslapiai",
    "prev_3": "Ankstesni 3 puslapiai",
    "next_3": "Kiti 3 puslapiai"
  },
  "DatePicker": DatePicker,
  "TimePicker": {
    "placeholder": "Pasirinkite laiką",
    "rangePlaceholder": ["Pradžios laikas", "Pabaigos laikas"]
  },
  "Calendar": DatePicker,
  "global": {
    "placeholder": "Prašome pasirinkti"
  },
  "Table": {
    "filterTitle": "Filtro meniu",
    "filterConfirm": "Gerai",
    "filterReset": "Atstatyti",
    //@ts-ignore
    "filterEmptyText": "Nėra filtrų",
    "selectAll": "Pasirinkite dabartinį puslapį",
    "selectInvert": "Apversti dabartinį puslapį",
    "selectionAll": "Pasirinkite visus duomenis",
    "sortTitle": "Rūšiuoti",
    "expand": "Išskleisti eilutę",
    "collapse": "Sutraukti eilutę",
    "triggerDesc": "Spustelėkite rūšiuoti pagal nusileidimą",
    "triggerAsc": "Spustelėkite Rūšiuoti pagal kylančią",
    "cancelSort": "Spustelėkite, jei norite atšaukti rūšiavimą"
  },
  "Modal": {
    "okText": "Gerai",
    "cancelText": "Atšaukti",
    "justOkText": "Gerai"
  },
  "Popconfirm": {
    "okText": "Gerai",
    "cancelText": "Atšaukti"
  },
  "Transfer": {
    "titles": ["", ""],
    "searchPlaceholder": "Ieškokite čia",
    "itemUnit": "daiktas",
    "itemsUnit": "daiktai",
    "remove": "Pašalinti",
    "selectCurrent": "Pasirinkite dabartinį puslapį",
    "removeCurrent": "Pašalinti dabartinį puslapį",
    "selectAll": "Pasirinkite visus duomenis",
    "removeAll": "Pašalinkite visus duomenis",
    "selectInvert": "Apversti dabartinį puslapį"
  },
  "Upload": {
    "uploading": "Įkeliama ...",
    "removeFile": "Pašalinti failą",
    "uploadError": "Įkelimo klaida",
    "previewFile": "Peržiūrėti failą",
    "downloadFile": "Atsisiųsti failą"
  },
  "Empty": {
    "description": "Nėra duomenų"
  },
  "Icon": {
    "icon": "piktogramą"
  },
  "Text": {
    "edit": "Redaguoti",
    "copy": "Kopijuoti",
    "copied": "Nukopijuota",
    "expand": "Išskleisti"
  },
  "PageHeader": {
    "back": "Atgal"
  },
  "Form": {
    "defaultValidateMessages": {
      "default": "Lauko patvirtinimo klaida ${label}",
      "required": "Įveskite ${label}",
      "enum": "${label} turi būti vienas iš [${enum}]",
      "whitespace": "${label} negali būti tuščias simbolis",
      "date": {
        "format": "Netinkamas ${label} datos formatas",
        "parse": "${label} negalima konvertuoti į datą",
        "invalid": "${label} yra neteisinga data"
      },
      "types": {
        "string": type,
        "method": type,
        "array": type,
        "object": type,
        "number": type,
        "date": type,
        "boolean": type,
        "integer": type,
        "float": type,
        "regexp": type,
        "email": type,
        "url": type,
        "hex": type
      },
      "string": {
        "len": "${label} turi būti ${len} simbolių",
        "min": "${label} bent ${min} simbolių",
        "max": "${label} iki ${max} simbolių",
        "range": "${label} simbolių turi būti nuo ${min} - ${max}"
      },
      "number": {
        "len": "${label} turi būti lygus ${len}",
        "min": "${label} minimali vertė yra ${min}",
        "max": "Maksimali ${label} vertė yra ${max}",
        "range": "${label} turi būti nuo ${min} iki ${max}."
      },
      "array": {
        "len": "Turi būti ${len} ${label}",
        "min": "Mažiausiai ${min} ${label}",
        "max": "Ne daugiau kaip ${max} ${label}",
        "range": "${label} suma turi būti nuo ${min} - ${max}"
      },
      "pattern": {
        "mismatch": "${label} neatitinka modelio ${pattern}"
      }
    }
  }
};
export default localeValues;
