module.exports = {
  env: {
    node: true,
    es2021: true,
    commonjs: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
  },
  overrides: [
    {
      files: ["tests/**/*.test.js"],
      env: {
        jest: true,
      },
    },
    {
      files: ["src/js/**/*.js"],
      env: {
        browser: true,
      },
      extends: ["eslint:recommended", "plugin:prettier/recommended"],
    },
  ],
};
