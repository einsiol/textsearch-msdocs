module.exports = {
  env: {
    'node': true,
    'commonjs': true,
  },
  parser: 'babel-eslint',
  extends: [
    'eslint:recommended',
    'plugin:ava/recommended'
  ],
  plugins: [
    'ava'
  ],
  rules: {
    'indent': ['error', 2],
    'quotes': ['error','single'],
    'semi': ['error','never'],
    'no-var': 'error',
    'one-var': 'off',
    'no-console': 'warn'
  }
}