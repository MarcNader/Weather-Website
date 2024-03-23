module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  "rules": {
    "sort-imports": ["error", {
      "ignoreCase": true, 
      "ignoreDeclarationSort": true,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
    "react/prop-types": "off",
      "react/jsx-max-props-per-line": ["error", {"maximum": { "single": 2, "multi": 1}}],
      "react/jsx-wrap-multilines":["error",{
          "declaration": "parens",
          "assignment": "parens",
          "return": "parens",
          "arrow": "parens",
          "condition": "parens-new-line",
          "logical": "parens-new-line",
          "prop": "ignore"
      }],
      "react/jsx-indent": ["error", 2],
      "react/jsx-indent-props": ["error", 2],
      "react/jsx-first-prop-new-line": 2,
      "react/jsx-closing-tag-location":2,
      "react/jsx-equals-spacing": [2, "never"],
      "react/jsx-curly-spacing": ["error", {"when": "never", "children": true}],
      "react/jsx-closing-bracket-location": ["error", { "selfClosing": "tag-aligned", "nonEmpty": "after-props"}],
      "block-spacing": ["error", "never"],
      "explicit-function-return-type": 0,
      "strict-boolean-expressions": 0,
      "consistent-type-definitions": ["error", "type"],
      "object-curly-spacing": 0,
      "consistent-type-definitions": 0,
      "consistent-indexed-object-style": 0,
      "object-curly-spacing": ["error", "never"],
      "padding-line-between-statements": [
          "error",
          {"blankLine": "always", "prev": "*", "next": ["return","if","try","for","while","export","const"]},
          {"blankLine": "never", "prev": "singleline-const", "next": "singleline-const"},
          {"blankLine": "always", "prev": "block-like", "next": "*"},
      ],
      "multiline-ternary": ["error", "always"]
    }
}
