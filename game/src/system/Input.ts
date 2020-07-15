import { Updatable } from 'pixi-ge'

type Code = 'up' | 'right' | 'left' | 'down'

export default class Input extends Updatable {
  private prevCode: Code | null = null
  private _code: Code | null = null

  public get code(): Code | null {
    return this._code
  }

  start(): void {
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    canvas?.addEventListener('pointerdown', (e: PointerEvent) => {
      const rect = (e.target as Element).getBoundingClientRect()
      const relX = e.clientX - rect.left
      const relY = e.clientY - rect.top
      // 左下(x=0,y=縦最大)から右上(x=横最大,y=0)までを結んだ関数
      const lb2rt = (x: number) => {
        return -x * rect.height / rect.width + rect.height
      }
      // 左上(x=0,y=0)から右上(x=横最大,y=縦最大)までを結んだ関数
      const lt2rb = (x: number) => {
        return x * rect.height / rect.width
      }
      // 端点同士を結んだ関数2つとy座標を比較して上下左右を取る
      const codeSet: Code[][] = [['up', 'left'], ['right', 'down']]
      const codeX = +(relY > lb2rt(relX))
      const codeY = +(relY > lt2rb(relX))
      this._code = codeSet[codeX][codeY]

      // 連打しているなどを考慮して前フレームの記録削除
      this.prevCode = null
    })
  }

  update(): void {
    // this._codeが変化した次のフレームも同じ値であればそのフレームでは入力が無いとみなす
    if (this._code && this._code == this.prevCode) {
      this._code = null
    } else {
      this.prevCode = this._code
    }
    console.log(this._code)
  }
}
