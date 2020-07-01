const path = require('path')

module.exports = (env, argv) => {
  return {
    mode: 'production',
    devtool: argv.mode !== 'production' ? 'source-map' : false,
    entry: {
      index: path.resolve('src', 'index.ts')
    },
    output: {
      path: path.resolve('dist'),
      filename: '[name].js',
      library: 'pixi-ge',
      libraryTarget: 'umd'
    },
    externals: ['pixi.js'],
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
    }
  }
}
