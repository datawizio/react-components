import * as React from "react";
import Loader from "../Loader";
import * as Highcharts from "highcharts";
import resizeDetector from "../../utils/resizeDetector";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

export interface HighChartProps {
  /**
   * highcharts config: https://api.highcharts.com/highcharts/.
   */
  config: Highcharts.Options;

  /**
   * Автоматически подстраивает размер графика под размер контейнера даже если у контейнера {width: auto, height: auto}
   */
  responsible?: boolean;

  /**
   * задержка при изменение размеров графика
   */
  resizeTimeout?: number;

  /**
   * Тип рендера - "chart" | "stockChart" | "mapChart" | "ganttChart"
   */
  constructorType?: string | "chart" | "stockChart" | "mapChart" | "ganttChart";

  /**
   * Показывать ли Loader
   */
  loading: boolean;
}

export interface HighChartRef {
  chart: Highcharts.Chart;
  container: HTMLDivElement;
}

const HighChart = forwardRef<HighChartRef, HighChartProps>((props, ref) => {
  const {
    config,
    loading,
    responsible,
    resizeTimeout,
    constructorType
  } = props;

  const chartRef = useRef<Highcharts.Chart>();
  const containerRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (responsible && containerRef.current)
      return resizeDetector(
        containerRef.current,
        async () => await chartRef.current.setSize(),
        resizeTimeout
      );
  }, [resizeTimeout, responsible, chartRef, containerRef]);

  useEffect(() => {
    if (containerRef.current)
      chartRef.current = Highcharts[constructorType](
        containerRef.current,
        config || { title: { text: "" } }
      );

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [config, constructorType]);

  useImperativeHandle(ref, () => ({
    get chart() {
      return chartRef.current;
    },
    get container() {
      return containerRef.current;
    }
  }));

  return (
    <Loader loading={loading}>
      <div ref={containerRef} />
    </Loader>
  );
});

HighChart.defaultProps = {
  responsible: false,
  resizeTimeout: 500,
  constructorType: "chart"
};

export default HighChart;
