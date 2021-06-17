import * as React from "react";
import Skeleton from "../Skeleton";
import * as Highcharts from "highcharts";
import resizeDetector from "../../utils/resizeDetector";

import {
  useRef,
  useMemo,
  forwardRef,
  useEffect,
  useImperativeHandle
} from "react";

import "./index.less";

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
  const firstTime = useRef<boolean>(true);

  const height = useMemo(() => {
    const heightByConfig = config && config.chart && config.chart.height;
    return heightByConfig || 300;
  }, [config]);

  useEffect(() => {
    if (containerRef.current) {
      if (responsible && firstTime.current) {
        containerRef.current.style.visibility = "hidden";
      }

      chartRef.current = Highcharts[constructorType](
        containerRef.current,
        config || { title: { text: "" } }
      );
    }

    return () => {
      // firstTime.current = true;
      if (chartRef.current) {
        chartRef.current.destroy();
        chartRef.current = null;
      }
    };
  }, [config, constructorType]);

  useEffect(() => {
    if (!loading && responsible && containerRef.current) {
      return resizeDetector(
        containerRef.current,
        async () => {
          firstTime.current = false;
          if (containerRef.current) {
            containerRef.current.style.visibility = "visible";
          }
          if (chartRef.current) await chartRef.current.setSize();
        },
        resizeTimeout
      );
    }
  }, [resizeTimeout, responsible, chartRef, loading, containerRef.current]);

  useImperativeHandle(ref, () => ({
    get chart() {
      return chartRef.current;
    },
    get container() {
      return containerRef.current;
    }
  }));

  return (
    <>
      {loading && <Skeleton height={height} width={"100%"} />}
      {!loading && <div ref={containerRef} />}
    </>
  );
});

HighChart.defaultProps = {
  responsible: false,
  resizeTimeout: 500,
  constructorType: "chart"
};

export default HighChart;
