module.exports = (ctx) => {
  const PROD = (ctx.env === 'prod')

  return {
    map: PROD ? null : { inline: false },
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {},
      'cssnano': PROD ? { autoprefixer: false } : false
    }
  }
}
