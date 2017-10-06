import WebPack from 'webpack'

const PROD = process.env.NODE_ENV === 'production'

export default {
  entry: './src/js/App.js',
  output: {
    path: PROD ? `${__dirname}/dist` : `${__dirname}/src/assets`,
    filename: 'bundle.js'
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
  devServer: {
    contentBase: './src/assets',
    hot: true,
    historyApiFallback: true,
    stats: {
      colors: true
    }
  },
  plugins: PROD ? [
    new WebPack.optimize.UglifyJsPlugin()
  ] : [
    new WebPack.HotModuleReplacementPlugin()
  ]
}
