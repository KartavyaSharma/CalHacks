module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
    parserOptions: {
      sourceType: "module",
    },
    env: {
      browser: true,
      amd: true,
      node: true,
    },
  };
  