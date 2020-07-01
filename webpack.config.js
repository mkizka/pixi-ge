const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  return {
    mode: 'production',
    devtool: argv.mode !== 'production' ? 'source-map' : false,
    entry: {
      'game/index': path.resolve('src', 'game', 'index.ts'),
      'engine/index': path.resolve('src', 'engine', 'index.ts')
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
      modules: [path.resolve('src'), 'node_modules']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [{ loader: 'ts-loader' }],
          exclude: /node_modules/
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'game/index.html',
        template: './src/game/index.html'
      })
    ],
    devServer: {
      open: true,
      openPage: 'game',
      contentBase: path.resolve('dist'),
      port: 8080
    }
  }
}
