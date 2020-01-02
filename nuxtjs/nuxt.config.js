console.log(`Environment: ${process.env.NUXT_ENV}`);

function getConfigByEnvironment() {
  const buildCommon = {
    extractCSS: true,
    babel: {
      presets: ({ isServer }) => [
        [
          '@nuxt/babel-preset-app',
          {
            targets: isServer ? { node: '8.11.1' } : { browsers: ['defaults'] }
          }
        ]
      ]
    }
  };
  if (process.env.NUXT_ENV === 'DEVICE') {
    return {
      build: {
        extend(config, ctx) {
          config.output.publicPath = 'nuxt/';
        },
        ...buildCommon
      },
      generate: {
        dir: '../cordova/www'
      }
    };
  } else if (process.env.NUXT_ENV === 'LOCAL') {
    return { build: buildCommon };
  } else {
    return { build: buildCommon };
  }
}

export default {
  mode: 'spa',
  ...getConfigByEnvironment(),
  router: {
    mode: 'hash'
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: [
      [
        'transform-runtime',
        {
          polyfill: true,
          regenerator: true
        }
      ]
    ]
  },
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [
    { src: '@/assets/style.scss', lang: 'scss' },
    '@/node_modules/@progress/kendo-theme-default/dist/all.css'
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/kendoui.js'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxtjs/eslint-module'],
  /*
   ** Nuxt.js modules
   */
  modules: []
};
