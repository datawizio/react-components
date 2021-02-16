import i18n from "i18next";
import { translateObjects } from ".";

export function translateChart(config: Highcharts.Options): Highcharts.Options {
  const nextConfig = { ...config };

  if (nextConfig.series) {
    nextConfig.series = translateObjects(nextConfig.series, "name");
  }

  if (nextConfig.yAxis) {
    const translateAxis = (axis: any) => ({
      ...axis,
      title: { text: i18n.t(axis.title.text) }
    });

    if (Array.isArray(nextConfig.yAxis))
      nextConfig.yAxis = Array.isArray(nextConfig.yAxis)
        ? nextConfig.yAxis.map(translateAxis)
        : translateAxis(nextConfig.yAxis);
  }

  return nextConfig;
}
