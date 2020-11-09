import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { JSDOM } from "jsdom";

const dom = new JSDOM();

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

global.document = dom.window.document;

global.console.error = message => {
  throw new Error(message);
};
