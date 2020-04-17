module.exports = {
  stories: [
    "../stories/intro/*.stories.(ts|tsx|js|jsx|mdx)",
    "../stories/**/*.stories.(ts|tsx|js|jsx|mdx)",
    "../src/**/*.stories.(ts|tsx|js|jsx|mdx)"
  ],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    {
      name: '@storybook/preset-create-react-app',
      options: {
        tsDocgenLoaderOptions: {},
      },
    },
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true
      }
    }
  ]
};
