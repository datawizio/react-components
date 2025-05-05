import TimePickerLocale from "../timePicker/sq_AL";

const calendarLocale = {
  locale: "sq_AL",
  today: "Sot",
  now: "Tani",
  backToToday: "Kthehu te sot",
  ok: "Ok",
  clear: "Pastro",
  month: "Muaj",
  year: "Vit",
  timeSelect: "Zgjidh kohën",
  dateSelect: "Zgjidh datën",
  monthSelect: "Zgjidh muajin",
  yearSelect: "Zgjidh vitin",
  decadeSelect: "Zgjidh dekadën",
  yearFormat: "YYYY",
  dateFormat: "D/M/YYYY",
  dayFormat: "D",
  dateTimeFormat: "D/M/YYYY HH:mm:ss",
  monthBeforeYear: true,
  previousMonth: "Muaji i kaluar (PageUp)",
  nextMonth: "Muaji tjetër (PageDown)",
  previousYear: "Viti i kaluar (Control + majtas)",
  nextYear: "Viti tjetër (Control + djathtas)",
  previousDecade: "Dekada e kaluar",
  nextDecade: "Dekada tjetër",
  previousCentury: "Shekulli i kaluar",
  nextCentury: "Shekulli tjetër"
};

const datePickerLocale = {
  lang: {
    placeholder: "Zgjidh datën",
    yearPlaceholder: "Zgjidh vitin",
    quarterPlaceholder: "Zgjidh tremujorin",
    monthPlaceholder: "Zgjidh muajin",
    weekPlaceholder: "Zgjidh javën",
    rangePlaceholder: ["Data e fillimit", "Data e përfundimit"],
    rangeYearPlaceholder: ["Viti i fillimit", "Viti i përfundimit"],
    rangeQuarterPlaceholder: [
      "Tremujori i fillimit",
      "Tremujori i përfundimit"
    ],
    rangeMonthPlaceholder: ["Muaji i fillimit", "Muaji i përfundimit"],
    rangeWeekPlaceholder: ["Java e fillimit", "Java e përfundimit"],
    ...calendarLocale
  },
  timePickerLocale: {
    ...TimePickerLocale
  }
};

export default datePickerLocale;
