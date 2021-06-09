import { SelectProps as AntSelectProps, SelectValue } from "antd/lib/select";
import { Select as AntSelect } from "antd";

export interface SelectProps<VT> extends AntSelectProps<VT> {
  /**
   * Функция которая будет вызываться для подгрузки данных с параметрами `searchValue`, `page`
   */
  loadData?: (
    string,
    number
  ) => [any] | { options: [any]; next: string | null };

  /**
   * Данные будут загружаться ассинхронно. Будет вызываться функция `loadData`
   */
  asyncData?: boolean;

  /**
   * Function for customized options
   * */
  optionRender?: (option: any) => any;

  /**
   * Текст Loading...
   */
  loadingContent?: string;

  /**
   * Подгрузка ассинхронных данных с пагинацией
   */
  withPagination?: boolean;
  /**
   * use custom tagRender
   */
  useCustomTagRender?: boolean;
}

export interface FCSelectProps extends React.FC<SelectProps<SelectValue>> {}

export interface FCSelect extends FCSelectProps {
  Option: typeof AntSelect.Option;
  OptGroup: typeof AntSelect.OptGroup;
}
