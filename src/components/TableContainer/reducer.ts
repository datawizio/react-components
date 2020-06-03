import { TableProps, TableState } from "../Table/types";

// export function initializer(props: TableProps): TableState {
//   const {
//     columns,
//     dataSource,
//     searchValue,
//     dTypesConfig,
//     visibleColumnsKeys
//   } = props;
//   return {
//     columns,
//     dataSource,
//     searchValue,
//     visibleColumnsKeys,

//     sortParams: {},
//     filterParams: {},
//     expandedRowKeys: [],
//     baseDataSource: dataSource,
//     dTypesConfig: { ...basicDTypesConfig, ...dTypesConfig }
//   };
// }

type Action = { type: "initDataSource"; payload: TableProps["dataSource"] };

export function reducer(state: TableState, action: Action): TableState {
  switch (action.type) {
    case "initDataSource":
      return {
        ...state,
        baseDataSource: action.payload
      };

    default:
      return state;
  }
}
