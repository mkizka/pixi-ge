import { UpdateObject } from 'pixi-ge'

type Code = 'up' | 'right' | 'left' | 'down'

export default class Input extends UpdateObject {
  private isDragging = false
  private nextCode: Code | null = null
  private static _code: Code | null = null

  public static get code(): Code | null {
    return Input._code
  }

  start(): void {
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    canvas?.addEventListener('pointerdown', (e: PointerEvent) => {
      this.isDragging = true
      this.nextCode = this.getNextCode(e)
    })
    canvas?.addEventListener('pointermove', (e: PointerEvent) => {
      if (!this.isDragging) return
      this.nextCode = this.getNextCode(e)
    })
    canvas?.addEventListener('pointerup', (e: PointerEvent) => {
      this.isDragging = false
      this.nextCode = null
    })
  }

  update(): void {
    if (Input._code !== this.nextCode) {
      Input._code = this.nextCode
    }
  }

  private getNextCode(e: PointerEvent): Code {
    const rect = (e.target as Element).getBoundingClientRect()
    const relX = e.clientX - rect.left
    const relY = e.clientY - rect.top
    // 左下(x=0,y=縦最大)から右上(x=横最大,y=0)までを結んだ関数
    const lb2rt = (x: number) => {
      return (-x * rect.height) / rect.width + rect.height
    }
    // 左上(x=0,y=0)から右上(x=横最大,y=縦最大)までを結んだ関数
    const lt2rb = (x: number) => {
      return (x * rect.height) / rect.width
    }
    // 端点同士を結んだ関数2つとy座標を比較して上下左右を取る
    const codeSet: Code[][] = [
      ['up', 'left'],
      ['right', 'down']
    ]
    const codeX = +(relY > lb2rt(relX))
    const codeY = +(relY > lt2rb(relX))

    return codeSet[codeX][codeY]
  }
}
