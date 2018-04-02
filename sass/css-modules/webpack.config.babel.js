import WebPack from 'webpack'
import MinifyPlugin from 'babel-minify-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

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
        },
        {
          test: /\.scss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: PROD ? '[hash:base64]' : '[name]-[local]-[hash:base64:5]',
                url: false,
                importLoaders: 1,
                sourceMap: !(PROD),
                minimize: PROD ? { autoprefixer: false } : false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: PROD ? 'compressed' : 'expanded',
                sourceMap: !(PROD)
              }
            }
          ]
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
      new MiniCssExtractPlugin({ filename: 'bundle.css' })
    ] : [
      // development
      new MiniCssExtractPlugin({ filename: 'bundle.css' })
    ]
  }
}
