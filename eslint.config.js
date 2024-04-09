import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import nodePlugin from "eslint-plugin-n";

export default [
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  nodePlugin.configs["flat/recommended-script"],

  {
    ignores: ["dist/*", ".cache/*"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.builtin,
      },
    },
  },
  {
    files: ["src/js/**/*.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
  },
  {
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
