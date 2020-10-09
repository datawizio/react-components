const esModules = ["rc-select"].join("|");

module.exports = {
  roots: ["./src"],
  verbose: true,
  bail: 1,
  preset: "ts-jest",
  clearMocks: true,
  collectCoverage: false,
  testEnvironment: "node",
  setupFiles: ["./setupTests.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"],
  testPathIgnorePatterns: ["node_modules/"],
  "transform": {
    "^.+\\.[tj]sx?$": "babel-jest",
    "^.+\\.mdx$": "@storybook/addon-docs/jest-transform-mdx"
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  moduleNameMapper: {
    // Mocks out all these file formats when tests are run
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "identity-obj-proxy",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  snapshotSerializers: ["enzyme-to-json/serializer"],
  globals: {
    window: {
      innerWidth: 500,
      innerHeight: 500
    }
  }
};
