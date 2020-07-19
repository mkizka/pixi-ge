import * as PIXI from 'pixi.js'
import Updatable from '../../core/base/Updatable'

/**
 * 即座にシーン遷移させるトランジション
 */
abstract class Transition extends Updatable {
  /**
   * PIXI.Graphicsインスタンス
   */
  public readonly overlay: PIXI.Graphics = new PIXI.Graphics()

  /**
   * トランジションが終了すると真
   */
  private finished = false

  /**
   * this.finishで呼び出される交換可能な関数
   */
  public onFinished: (() => void) | undefined

  /**
   * トランジションの終了宣言
   */
  protected finish(): void {
    this.finished = true
    if (this.onFinished) {
      this.onFinished()
    }
  }

  /**
   * this.finishedのゲッター
   */
  public get isFinished(): boolean {
    return this.finished
  }

  public behave(): void {
    if (this.finished) return
    super.behave()
  }
}

export default Transition
