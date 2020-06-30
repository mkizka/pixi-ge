const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {
  return {
    mode: 'production',
    devtool: argv.mode !== 'production' ? 'source-map' : false,
    entry: {
      game: path.join(__dirname, 'src', 'game.ts'),
      'pixi-ge': path.join(__dirname, 'src', 'engine', 'index.ts')
    },
    output: {
      path: path.join(__dirname, 'www'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', 'js'],
      modules: [path.resolve(__dirname, 'src'), 'node_modules']
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
    plugins: [new HtmlWebpackPlugin()]
  }
}
