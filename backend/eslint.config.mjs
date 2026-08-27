import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: ["dist/**", "node_modules/**", "coverage/**", "*.min.js"],
  },
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      // Estilo e formatação (auto-fixable)
      "no-trailing-spaces": "warn",
      "no-multiple-empty-lines": ["warn", { max: 1, maxEOF: 0 }],
      curly: ["error", "multi-line"],
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-var": "error",
      "prefer-const": "error",
      "prefer-template": "warn",
      "object-shorthand": ["warn", "always"],
      "no-duplicate-imports": "error",
      "no-unused-expressions": "warn",
      "no-unneeded-ternary": "warn",
      "no-else-return": "warn",
      "no-lonely-if": "warn",
      "prefer-arrow-callback": "warn",
      "arrow-body-style": ["warn", "as-needed"],
      "no-useless-return": "warn",
      "no-useless-concat": "warn",
      "no-useless-computed-key": "warn",
      "no-useless-rename": "warn",
      "prefer-destructuring": ["warn", { array: false, object: true }],

      // TypeScript (auto-fixable)
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/no-non-null-assertion": "warn",
    },
  },
);
