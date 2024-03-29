module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'eslint-config-prettier'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: [
          'src'
        ],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx'
        ]
      }
    }
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    'prettier',
    'import'
  ],
  rules: {
    "react/react-in-jsx-scope": "off",
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'no-unused-vars': [
      'error',
      {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': true,
        'argsIgnorePattern': '^_'
      }
    ],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {
      "trailingComma": "all",
      "tabWidth": 2,
      "semi": true,
      "singleQuote": true,
      "printWidth": 100,
      "bracketSpacing": true,
      "endOfLine": "lf"
  }],
    'import/no-unresolved': [
      'error',
      {
        'ignore': [ '\.svg' ]
      }
    ],
    "no-unused-vars": "off",
    "react/display-name": "off",
    "react-hooks/exhaustive-deps": 'off',
    "@typescript-eslint/no-unused-vars": "error"
  },
}
