import typescript from '@rollup/plugin-typescript'

import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true
  },
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      declaration: true,
      rootDir: 'src',
      declarationDir: 'dist'
    })
  ]
}
