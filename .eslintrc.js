module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: "./tsconfig.json",
  },
  plugins: [
    "@typescript-eslint/eslint-plugin",
    "no-relative-import-paths",
  ],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "plugin:sonarjs/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "array-bracket-spacing": ["error", "never"],
    "comma-dangle": ["error", "only-multiline"],
    "eqeqeq": ["error"],
    "import/prefer-default-export": "off",
    "keyword-spacing": ["error", { "after": true, "before": true }],
    "max-len": ["error", {
      "code": 120,
      "ignorePattern": "^import\\s.+\\sfrom\\s.+;$"
    }],
    "max-statements-per-line": "error",
    "newline-before-return": ["error"],
    "no-relative-import-paths/no-relative-import-paths": ["error", {
      "allowSameFolder": false
    }],
    "no-template-curly-in-string": "error",
    "no-void": "error",
    "object-curly-spacing": ["error", "always"],
    "prettier/prettier": ["error", {
      "singleQuote": false
    }],
    "require-await": "off",
    "semi": ["error", "always", {
      "omitLastInOneLineBlock": true
    }],
    "sonarjs/no-duplicate-string": "off",
    "sonarjs/prefer-immediate-return": "off",
    "@typescript-eslint/ban-tslint-comment": "error",
    "@typescript-eslint/naming-convention": ["error", {
      "format": ["camelCase"],
      "selector": "classMethod"
    }],
    "@typescript-eslint/no-duplicate-imports": "error",
    "@typescript-eslint/no-floating-promises": ["error"],
    "@typescript-eslint/no-shadow": "error",
    "@typescript-eslint/no-unnecessary-boolean-literal-compare": "error",
    "@typescript-eslint/no-unused-vars": ["error", {
      "argsIgnorePattern": "^_"
    }],
    "@typescript-eslint/require-await": ["error"],
    "@typescript-eslint/strict-boolean-expressions": ["error"],
    "@typescript-eslint/type-annotation-spacing": ["error"],
    "no-console": "warn",
  },
};
