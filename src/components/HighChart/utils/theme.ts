import Highcharts from "highcharts";
import { DarkUnica } from "../themes/dark-unica";

export const setHighchartsTheme = () => {
  if (window.theme === "dark") {
    // @ts-ignore
    Highcharts.theme = DarkUnica;
    Highcharts.setOptions(Highcharts.theme);
  }
};
