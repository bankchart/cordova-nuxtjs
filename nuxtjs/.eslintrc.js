module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    'nuxt/no-cjs-in-config': 'off',
    'no-useless-escape': 'off',
    'vue/valid-v-for': 'off',
    'no-unused-vars': 'off',
    'handle-callback-err': 'off',
    'import/no-named-as-default': 'off',
    'nuxt/no-this-in-fetch-data': 'off',
    'vue/no-v-html': 'off',
    "no-console": [
      "warn",
      {
        allow: ["error", "trace", "warn", "info"]
      }
    ]
  }
}
