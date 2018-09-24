module.exports = {
  env: {
    'node': true,
    'commonjs': true,
  },
  parser: 'babel-eslint',
  plugins: [
    'ava',
    'import',
    'node',
    'promise',
    'filenames'
  ],
  extends: [
    'eslint:all',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:promise/recommended',
    'plugin:ava/recommended'
  ],
  rules: {
    'indent': ['error', 2],
    'quotes': ['error','single'],
    'semi': ['error','never'],
    'no-var': 'error',
    'one-var': 'off',
    'no-console': 'warn',
    'no-process-env': 'off',
    'object-property-newline': 'off',
    'dot-location': 'off',
    'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
    'quote-props': 'off',
    "sort-keys": ["error", "asc", {"caseSensitive": true, "natural": true}],
    'sort-imports': 'off',

    // https://github.com/selaux/eslint-plugin-filenames#rules
    'filenames/match-exported': ['error', 'kebab'],
    'filenames/no-index': 'off'
    
  }
}