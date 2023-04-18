module.exports = {
  root: true,
  extends: ["@nuxtjs/eslint-config-typescript", "plugin:prettier/recommended"],
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
