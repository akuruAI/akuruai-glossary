import baseConfig from "../../../../eslint.config.mjs";

export default [
  ...baseConfig,
  {
    files: ["**/*.ts"],
    rules: {
      "no-unused-vars": "off",
    },
  },
];
