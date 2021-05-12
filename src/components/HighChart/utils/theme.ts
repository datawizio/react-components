import Highcharts from "highcharts";
import { DarkUnica } from "../themes/dark-unica";

export const setHighchartsTheme = () => {
  if (window.theme === "dark") {
    // @ts-ignore
    Highcharts.theme = DarkUnica;
    // @ts-ignore
    Highcharts.setOptions(Highcharts.theme);
  }
};
