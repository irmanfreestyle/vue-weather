module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vueather/'
  : '/',
  transpileDependencies: [
    'vuetify'
  ]
}
