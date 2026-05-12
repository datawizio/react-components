import "jsdom-global/register";
import React from "react";
import { shallow } from "enzyme";
import dayjsGenerateConfig from "rc-picker/es/generate/dayjs";

import DatePicker from "./index";
import { fiscalCalendarConfig } from "./config/fiscal";

const mockProps = {};

const setUp = (props?) => shallow(<DatePicker {...props} />);

describe(" DatePicker component", () => {
  let component;
  beforeEach(() => {
    component = setUp(mockProps);
  });

  it("DatePicker rendered correctly", () => {
    expect(component).toMatchSnapshot();
  });

  it("rejects overflow dates for all supported date orders", () => {
    const invalidDatesByFormat = [
      ["39-05-2025", "DD-MM-YYYY"],
      ["05-39-2025", "MM-DD-YYYY"],
      ["2025-05-39", "YYYY-MM-DD"]
    ];

    invalidDatesByFormat.forEach(([value, format]) => {
      expect(
        dayjsGenerateConfig.locale.parse("en_US", value, [format])
      ).toBeNull();
      expect(
        fiscalCalendarConfig.locale.parse("en_US", value, [format])
      ).toBeNull();
    });
  });

  it("parses valid dates with strict matching", () => {
    const parsedDate = dayjsGenerateConfig.locale.parse("en_US", "31-05-2025", [
      "DD-MM-YYYY"
    ]);

    expect(parsedDate?.format("YYYY-MM-DD")).toBe("2025-05-31");
  });
});
