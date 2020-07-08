import * as PIXI from 'pixi.js'
import Transition from './base/Transition'
import Scene from '../core/Scene'

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
   * 黒画面の描画
   */
  private overlay = new PIXI.Graphics()

  /**
   * コンストラクタ
   */
  constructor(scene: Scene, alpha: Alpha) {
    super(scene)
    this.alpha = alpha
    this.scene = scene

    const { width, height } = scene.app.view
    this.overlay.beginFill(0x000000)
    this.overlay.moveTo(0, 0)
    this.overlay.lineTo(width, 0)
    this.overlay.lineTo(width, height)
    this.overlay.lineTo(0, height)
    this.overlay.endFill()
    this.overlay.alpha = this.alpha.from
  }

  public start() {
    this.scene.container.addChild(this.overlay)
  }

  public update(): void {
    console.log(1)
    if (
      this.alpha.from <= this.overlay.alpha &&
      this.overlay.alpha <= this.alpha.to
    ) {
      this.overlay.alpha += this.alpha.progress
    } else {
      this.finished = true
    }
  }
}
