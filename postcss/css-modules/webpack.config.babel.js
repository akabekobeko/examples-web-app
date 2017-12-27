import WebPack from 'webpack'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default (env) => {
  const PROD = !!(env && env.prod)

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
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract([
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                sourceMap: !(PROD),
                minimize: PROD ? { autoprefixer: false } : false
              }
            },
            'postcss-loader'
          ])
        }
      ]
    },
    devServer: {
      contentBase: './src/assets'
    },
    plugins: PROD ? [
      new WebPack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      }),
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
      new ExtractTextPlugin({ filename: 'bundle.css' })
    ] : [
      // development
      new ExtractTextPlugin({ filename: 'bundle.css' })
    ]
  }
}
