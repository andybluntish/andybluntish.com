module.exports = {
  env: {
    browser: true,
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
      files: [
        '.eslintrc.js',
        '.eleventy.js',
        'postcss.config.js',
        'scripts/*.js',
        'lib/**/*.js',
        'tests/**/*.js',
        'src/_data/**/*.js',
      ],
      parserOptions: {
        sourceType: 'script',
      },
      env: {
        node: true,
      },
      plugins: ['node'],
    },
    {
      files: ['tests/**/*.test.js'],
      globals: {
        jest: 'readonly',
        describe: 'readonly',
        test: 'readonly',
        expect: 'readonly',
      },
    },
  ],
}
