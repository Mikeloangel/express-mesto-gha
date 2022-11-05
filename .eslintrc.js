module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es2021": true
  },
  "extends": ["eslint:recommended"],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    // "no-underscore-dangle": ["error", { "allow": ["_place"] }],
    "no-underscore-dangle": ["error", { "allow": ["_id"] }]
  },
}
