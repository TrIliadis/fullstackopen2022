module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    node: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 'off',
    'linebreak-style': 0,
    'no-underscore-dangle': ['off'],
    'no-plusplus': 'off',
    'no-restricted-syntax': 'off',
  },
};
