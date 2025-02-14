import antfu from "@antfu/eslint-config";
// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
//
//
// const compat = new FlatCompat({
//   baseDirectory: __dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),
// ];

export default antfu({
  // eslintConfig,
  formatters: true,
  react: true,
  typescript: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
  rules: {
    "style/semi": ["error", "always"],
    "regexp/confusing-quantifier": "off",
    "node/prefer-global/process": "off",
    "eslint-comments/no-unlimited-disable": "off",
    "@typescript-eslint/consistent-type-imports": "off",
    "no-unused-vars": ["error", {
      args: "none",
      caughtErrors: "none",
      ignoreRestSiblings: true,
      vars: "all",
    }],
    "unused-imports/no-unused-vars": "off",
  },
  ignores: [
    "tools/*",
    "types/react-table.d.ts",
    "node_modules",
  ],
});
