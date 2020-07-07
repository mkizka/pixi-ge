import * as PIXI from 'pixi.js'
import Transition from './base/Transition'
import GameManager from '../core/GameManager'

/**
 * トランジションのフェード表現
 */
export default class Fade extends Transition {
  /**
   * フェード開始時の黒画面アルファ
   */
  private readonly alphaFrom: number
  /**
   * フェード終了時の黒画面アルファ
   */
  private readonly alphaTo: number
  /**
   * 1フレーム毎の黒画面アルファ加算値
   */
  private readonly alphaProgress: number
  /**
   * 黒画面の描画
   */
  private overlay = new PIXI.Graphics()

  /**
   * コンストラクタ
   */
  constructor(alphaFrom: number, alphaTo: number, alphaProgress: number) {
    super()
    this.alphaFrom = alphaFrom
    this.alphaTo = alphaTo
    this.alphaProgress = alphaProgress

    const { width, height } = GameManager.getApp().view

    // フェード用の黒い画面
    this.overlay.beginFill(0x000000)
    this.overlay.moveTo(0, 0)
    this.overlay.lineTo(width, 0)
    this.overlay.lineTo(width, height)
    this.overlay.lineTo(0, height)
    this.overlay.endFill()
    this.overlay.alpha = this.alphaFrom

    this.container.addChild(this.overlay)
  }

  /**
   * トランジションを更新する
   */
  public update(): void {
    if (
      (this.alphaTo <= this.alphaFrom && this.overlay.alpha <= this.alphaTo) ||
      (this.alphaTo >= this.alphaFrom && this.overlay.alpha >= this.alphaTo)
    ) {
      this.finished = true
    } else {
      this.overlay.alpha += this.alphaProgress
    }
  }
}
