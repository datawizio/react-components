import { HighChartProps } from "../";

export const HighChartWithProps: React.FC<HighChartProps> = {
  defaultProps: {
    responsible: false,
    resizeTimeout: 500,
    constructorType: "chart"
  }
} as any;
