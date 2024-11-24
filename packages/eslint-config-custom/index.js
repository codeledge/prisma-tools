module.exports = {
  extends: [
    "next",
    "turbo",
    "prettier",
    "eslint:recommended",
    "alloy",
    "alloy/typescript",
  ],
  rules: {
    "@next/next/no-html-link-for-pages": "off",
    "no-unused-vars": "off",
    "no-unreachable": 1,
  },
  plugins: ["sort-imports-es6-autofix", "import"],
};
