import * as PIXI from 'pixi.js'
import Updatable from '../../core/base/Updatable'
import Scene from '../../core/Scene'

/**
 * 即座にシーン遷移させるトランジション
 */
abstract class Transition extends Updatable {
  /**
   * PIXI.Graphicsインスタンス
   */
  public readonly overlay: PIXI.Graphics = new PIXI.Graphics()

  /**
   * トランジションが実行されるシーン
   */
  protected scene: Scene | undefined

  /**
   * トランジションが終了すると真
   */
  private finished: boolean = false

  /**
   * this.finishで呼び出される交換可能な関数
   */
  public onFinished: () => void = () => {}

  constructor(scene?: Scene) {
    super()
    this.scene = scene
  }

  /**
   * トランジションの終了宣言
   */
  protected finish(): void {
    this.finished = true
    this.overlay.destroy()
    this.onFinished()
  }

  /**
   * this.finishedのゲッター
   */
  public get isFinished() {
    return this.finished
  }

  public behave(): void {
    if (this.finished) return
    super.behave()
  }
}

export default Transition
