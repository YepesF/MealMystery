import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  // Configuration for JavaScript files
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "prettier/prettier": "error",
    },
  },
  // Extend Prettier configuration
  {
    files: ["**/*.js"],
    extends: [prettierConfig],
  },
];
