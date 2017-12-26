module.exports = (ctx) => {
  const PROD = ctx.env === 'prod'

  return {
    map: PROD ? null : { inline: false },
    plugins: {
      'postcss-import': {},
      'postcss-cssnext': {
        warnForDuplicates: false
      },
      'cssnano': PROD ? {} : false
    }
  }
}
