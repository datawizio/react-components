import React, { ReactNode, useCallback, useMemo } from "react";
import { Form } from "antd";
import Input from "../../Input";
import { FieldTextProps } from "../types";
import InfoTooltip from "../../InfoTooltip";
import "../../InfoTooltip/index.less";

export const FieldText: React.FC<FieldTextProps> = React.memo(
  React.forwardRef(
    ({ onChange, rules, name, label, infoTooltip, ...props }, ref) => {
      const formItemLabel: string | ReactNode = useMemo(() => {
        if (label && infoTooltip) {
          return (
            <div className="label-with-info">
              {label}
              <InfoTooltip {...infoTooltip} />
            </div>
          );
        }
        return label;
      }, [infoTooltip, label]);

      const handleFieldChange = useCallback(
        ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
          onChange &&
            onChange({
              name,
              value
            });
        },
        [name, onChange]
      );

      return (
        <Form.Item name={name} label={formItemLabel} rules={rules}>
          <Input
            {...props}
            //@ts-ignore
            ref={ref}
            onChange={handleFieldChange}
          />
        </Form.Item>
      );
    }
  )
);
