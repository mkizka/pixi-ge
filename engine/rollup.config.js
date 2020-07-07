import babel from '@rollup/plugin-babel'
import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  external: [...Object.keys(pkg.devDependencies || {})],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      extensions: ['.js', '.ts']
    }),
    typescript({
      declaration: true,
      rootDir: 'src',
      declarationDir: 'dist'
    })
  ]
}
