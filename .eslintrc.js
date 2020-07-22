module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },

  overrides: [
    {
      files: ['.eslintrc.js', '.eleventy.js', 'ember-cli-build.js', 'scripts/*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        browser: false,
        node: true,
      },
      plugins: ['node'],
    },
  ],
}
