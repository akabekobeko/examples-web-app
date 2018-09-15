module.exports = (api) => {
  const presetEnv = [
    '@babel/preset-env',
    {
      targets: {
        ie: 11
      },
      useBuiltIns: 'usage'
    }
  ]

  return {
    presets: api.env('development') ? [
      presetEnv,
      'power-assert'
    ] : [
      presetEnv
    ]
  }
}
