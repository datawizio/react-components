import { addParameters } from "@storybook/react";
import { MINIMAL_VIEWPORTS } from "@storybook/addon-viewport";
import "!style-loader!css-loader!less-loader!../src/styles/storybook.less";

addParameters({
  viewport: {
    viewports: MINIMAL_VIEWPORTS
  },
  options: {
    showRoots: true
  }
});
