import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      autoExternal: false,
      bundle: false,
      dts: true,
      format: "esm",
      output: {
        minify: true,
        externals: ["es-toolkit", "react"],
      },
    },
  ],
  source: {
    entry: {
      index: "./src/index.ts",
    },
  },
});
