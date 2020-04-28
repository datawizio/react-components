import path from "path";

import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import rollupPostcssLessLoader from "rollup-plugin-postcss-webpack-alias-less-loader";
import visualizer from "rollup-plugin-visualizer";
import cleanup from "rollup-plugin-cleanup";

import packageJson from "./package.json";

export default {
  input: "src/index.tsx",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
      exports: "named"
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
      exports: "named"
    }
  ],
  plugins: [
    visualizer(),
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    postcss({
      extract: true,
      sourceMap: true,
      use: [["less", { javascriptEnabled: true }]],
      loaders: [
        rollupPostcssLessLoader({
          nodeModulePath: path.resolve(__dirname, "./node_modules"),
          aliases: {},
          options: {
            javascriptEnabled: true
          }
        })
      ]
    }),

    cleanup({ extensions: ["js", "jsx", "ts", "tsx"] })
  ]
};
