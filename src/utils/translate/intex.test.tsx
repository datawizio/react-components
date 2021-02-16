import i18n, { translationsEng } from "./i18nMock";
import React from "react";
import { shallow } from "enzyme";
import { I18nextProvider } from "react-i18next";

import {
  translateArray,
  translateColumns,
  translateDataSource,
  translateObjects,
  translateTableResponse
} from "./index";
import { translateChart } from "./chart";

const translateKeys = Object.keys(translationsEng);
const mockColumns = translateKeys.map((translationKey, id) => ({
  title: translationKey,
  filters: {
    need_translate: true,
    data: [
      {
        text: translationKey
      }
    ]
  },
  children: [
    {
      title: translationKey
    }
  ]
}));

const mockDataSource = translateKeys.map((translationKey, id) => ({
  key: translationKey,
  children: [
    {
      value: translationKey
    }
  ]
}));

const expected = i18n.t(mockDataSource[0].key);

const setUp = testFunc =>
  shallow(
    <I18nextProvider i18n={i18n}>
      <button id="btn" onClick={testFunc} />
    </I18nextProvider>
  );

describe("Translate utils", () => {
  let result;

  afterEach(() => {
    result = null;
  });

  it("translateArray works correctly", () => {
    const testFunc = () => (result = translateArray(translateKeys));
    const wrapper = setUp(testFunc);
    wrapper.find("#btn").simulate("click");

    const expectedResult = Object.values(translationsEng);
    expect(result).toEqual(expectedResult);
  });

  it("translateObjects works correctly", () => {
    const transtatedProperty = "translationKey";
    const mockObjects = translateKeys.map((translationKey, id) => ({
      id,
      [transtatedProperty]: translationKey
    }));

    const testFunc = () =>
      (result = translateObjects(mockObjects, transtatedProperty));
    const wrapper = setUp(testFunc);
    wrapper.find("#btn").simulate("click");

    expect(result[0][transtatedProperty]).toEqual(expected);
  });

  it("translateDataSource works correctly", () => {
    const testFunc = () =>
      (result = translateDataSource(mockDataSource as any));
    const wrapper = setUp(testFunc);
    wrapper.find("#btn").simulate("click");

    expect(result[0]["key"]).toBe(expected);
    expect(result[0]["children"][0]["value"]).toBe(expected);
  });

  it("translateColumns works correctly", () => {
    const testFunc = () => (result = translateColumns(mockColumns as any));
    const wrapper = setUp(testFunc);
    wrapper.find("#btn").simulate("click");

    const expected = i18n.t(mockColumns[0]["title"]);

    expect(result[0]["title"]).toBe(expected);
    expect(result[0]["filters"][0]["text"]).toBe(expected);
  });

  it("translateTableResponse works correctly", async () => {
    const mockFetcher = jest.fn(() => ({
      results: {
        columns: mockColumns,
        dataSource: mockDataSource
      }
    }));

    const testFunc = () => {
      result = translateTableResponse(mockFetcher as any);
    };
    const wrapper = setUp(testFunc);
    wrapper.find("#btn").simulate("click");

    const {
      results: { columns, dataSource }
    } = await result();

    expect(dataSource[0]["key"]).toEqual(expected);
    expect(dataSource[0]["children"][0]["value"]).toEqual(expected);
    expect(columns[0]["title"]).toEqual(expected);
    expect(columns[0]["filters"][0]["text"]).toEqual(expected);
  });

  it("translateChart works correctly", async () => {
    const mockConfig = {
      series: [
        {
          name: translateKeys[0]
        }
      ],
      yAxis: [
        {
          title: {
            text: translateKeys[1]
          }
        }
      ]
    };

    const testFunc = () => {
      result = translateChart(mockConfig as any);
    };
    const wrapper = setUp(testFunc);
    wrapper.find("#btn").simulate("click");

    const expectedName = i18n.t(translateKeys[0]);
    const expectedText = i18n.t(translateKeys[1]);

    expect(result["series"][0]["name"]).toEqual(expectedName);
    expect(result["yAxis"][0]["title"]["text"]).toEqual(expectedText);
  });
});
