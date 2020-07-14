import Transition from './base/Transition'
import Game from '../Game'

type Alpha = {
  from: number
  to: number
  progress: number
}

/**
 * トランジションのフェード表現
 */
export default class Fade extends Transition {
  /**
   * フェード開始時の黒画面アルファ
   */
  private readonly alpha: Alpha

  /**
   * コンストラクタ
   */
  constructor(alpha: Alpha) {
    super()
    this.alpha = alpha

    const { width, height } = Game.app.view
    this.overlay.beginFill(0x000000)
    this.overlay.moveTo(0, 0)
    this.overlay.lineTo(width, 0)
    this.overlay.lineTo(width, height)
    this.overlay.lineTo(0, height)
    this.overlay.endFill()
    this.overlay.alpha = this.alpha.from
  }

  public update(): void {
    const isAsc = this.alpha.from <= this.alpha.to
    if (
      (isAsc && this.overlay.alpha <= this.alpha.to) ||
      (!isAsc && this.overlay.alpha >= this.alpha.to)
    ) {
      this.overlay.alpha += this.alpha.progress
    } else {
      this.finish()
    }
  }
}
