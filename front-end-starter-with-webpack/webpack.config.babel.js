import WebPack from 'webpack'
import MinifyPlugin from 'babel-minify-webpack-plugin'

export default (env, argv) => {
  const PROD = !!(argv.mode && argv.mode === 'production')

  return {
    entry: './src/js/App.js',
    output: {
      path: PROD ? `${__dirname}/dist` : `${__dirname}/src/assets`,
      filename: 'bundle.js',
      publicPath: '/'
    },
    devtool: PROD ? '' : 'source-map',
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: PROD ? [
      new MinifyPlugin({
        replace: {
          'replacements': [
            {
              'identifierName': 'DEBUG',
              'replacement': {
                'type': 'numericLiteral',
                'value': 0
              }
            }
          ]
        }
      }, {}),
      new WebPack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ] : [
      // development
    ]
  }
}
