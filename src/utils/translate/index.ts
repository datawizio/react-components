import i18n from "i18next";
import { IColumn, IRow, TableResponse } from "../../components/Table/types";

export const translateArray = (array: Array<string>) => {
  return array.map(item => i18n.t(item));
};

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

export const translateObjects = <T>(
  array: T | any,
  propertyName: string = "title"
): T => {
  return array.map((item: any) => ({
    ...item,
    value: item.value ? item.value : item.id,
    [propertyName]: i18n.t(item[propertyName])
  }));
};

export function translateTableResponse(
  fetcher: (...args: any) => Promise<TableResponse>
) {
  return async (...args: any) => {
    let response = await fetcher(...args);

    if (response.results) {
      const {
        results: { columns, dataSource }
      } = response;

      response.results.columns = columns && translateColumns(columns);
      response.results.dataSource =
        dataSource && translateDataSource(dataSource);
    }

    return response;
  };
}

export function translateColumns(columns: Array<IColumn>) {
  return [...columns].map(column => {
    const nextColumn = { ...column };
    nextColumn.title = i18n.t(column.title as string);

    if (column.children && column.children.length) {
      translateColumns(column.children);
    }

    if (column.filters) {
      //@ts-ignore
      nextColumn.filters = column.filters.need_translate
        ? //@ts-ignore
          translateObjects(column.filters.data, "text")
        : //@ts-ignore
          column.filters.data;
    }

    return nextColumn;
  });
}

export function translateDataSource(dataSource: Array<IRow>): any {
  return [...dataSource].map(row => {
    return Object.entries(row).reduce(
      (acc, [dataIndex, cell]: any) => {
        if (typeof cell === "string") acc[dataIndex] = i18n.t(cell) as string;
        if (typeof cell === "object") {
          acc[dataIndex] = {
            ...cell,
            value: i18n.t(cell.value) as string
          };
        }

        return acc;
      },
      { ...row }
    );
  });
}