module.exports = {
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  // "extends": ["eslint:recommended"],
  extends: ['airbnb-base'],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
  },
};
