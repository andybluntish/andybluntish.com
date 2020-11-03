module.exports = {
  env: {
    node: true,
    es2020: true,
    commonjs: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  overrides: [
    {
      files: ['tests/**/*.test.js'],
      env: {
        jest: true,
      },
    },
    {
      files: ['src/js/**/*.js'],
      env: {
        browser: true,
      },
      extends: ['eslint:recommended'],
    },
  ],
}
