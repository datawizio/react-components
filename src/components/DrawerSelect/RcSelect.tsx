/**
 * To match accessibility requirement, we always provide an input in the component.
 * Other element will not set `tabIndex` to avoid `onBlur` sequence problem.
 * For focused select, we set `aria-live="polite"` to update the accessibility content.
 *
 * ref:
 * - keyboard: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role#Keyboard_interactions
 *
 * New api:
 * - listHeight
 * - listItemHeight
 * - component
 *
 * Remove deprecated api:
 * - multiple
 * - tags
 * - combobox
 * - firstActiveValue
 * - dropdownMenuStyle
 * - openClassName (Not list in api)
 *
 * Update:
 * - `backfill` only support `combobox` mode
 * - `combobox` mode not support `labelInValue` since it's meaningless
 * - `getInputElement` only support `combobox` mode
 * - `onChange` return OptionData instead of ReactNode
 * - `filterOption` `onChange` `onSelect` accept OptionData instead of ReactNode
 * - `combobox` mode trigger `onChange` will get `undefined` if no `value` match in Option
 * - `combobox` mode not support `optionLabelProp`
 */

import React from "react";
import { OptionsType as SelectOptionsType } from "rc-select/es/interface";
import SelectOptionList from "rc-select/es/OptionList";
import Option from "rc-select/es/Option";
import OptGroup from "rc-select/es/OptGroup";
import { convertChildrenToData as convertSelectChildrenToData } from "rc-select/es/utils/legacyUtil";
import {
  getLabeledValue as getSelectLabeledValue,
  filterOptions as selectDefaultFilterOptions,
  isValueDisabled as isSelectValueDisabled,
  findValueOption as findSelectValueOption,
  flattenOptions,
  fillOptionsWithMissingValue
} from "rc-select/es/utils/valueUtil";
import generateSelector, { SelectProps } from "../DrawerTreeSelect/RcSelect";
import { RefSelectProps } from "rc-select/es/generate";
import { DefaultValueType } from "rc-select/es/interface/generator";
import warningProps from "rc-select/es/utils/warningPropsUtil";

const RefSelect = generateSelector<SelectOptionsType>({
  prefixCls: "rc-select",
  components: {
    optionList: SelectOptionList
  },
  convertChildrenToData: convertSelectChildrenToData,
  flattenOptions,
  getLabeledValue: getSelectLabeledValue,
  filterOptions: selectDefaultFilterOptions,
  isValueDisabled: isSelectValueDisabled,
  findValueOption: findSelectValueOption,
  warningProps,
  fillOptionsWithMissingValue
});

export type ExportedSelectProps<
  ValueType extends DefaultValueType = DefaultValueType
> = SelectProps<SelectOptionsType, ValueType>;

/**
 * Typescript not support generic with function component,
 * we have to wrap an class component to handle this.
 */
class Select<VT> extends React.Component<SelectProps<SelectOptionsType, VT>> {
  static Option: typeof Option = Option;

  static OptGroup: typeof OptGroup = OptGroup;

  selectRef = React.createRef<RefSelectProps>();

  focus = () => {
    this.selectRef.current.focus();
  };

  blur = () => {
    this.selectRef.current.blur();
  };

  render() {
    return <RefSelect ref={this.selectRef} {...this.props} />;
  }
}

export default Select;
