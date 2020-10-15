module.exports = {
  env: {
    test: {
      presets: [
        [
          "@babel/preset-env",
          {
            modules: "commonjs",
            debug: false,
            targets: {
              node: "current"
            }
          }
        ],
        "@babel/preset-flow",
        "@babel/preset-react",
        "@babel/preset-typescript"
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-transform-runtime"
      ]
    },
    production: {
      presets: [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-flow",
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
      ]
    },
    development: {
      presets: [
        ["@babel/preset-env", { modules: false }],
        "@babel/preset-flow",
        "@babel/preset-react"
      ],
      plugins: [
        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-proposal-class-properties"
      ]
    }
  }
};
