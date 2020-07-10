import * as PIXI from 'pixi.js'
import Updatable from '../../core/base/Updatable'
import Scene from '../../core/Scene'

/**
 * 即座にシーン遷移させるトランジション
 */
abstract class Transition extends Updatable {
  /**
   * PIXI.Containerインスタンス
   */
  public readonly container: PIXI.Container = new PIXI.Container()

  /**
   * トランジションが実行されるシーン
   */
  protected scene: Scene | undefined

  /**
   * トランジションが終了すると真
   */
  protected finished: boolean = false

  /**
   * this.finished==trueのときにthis.behaveに呼び出される
   */
  public onFinished: () => void = () => {}

  constructor(scene?: Scene) {
    super()
    this.scene = scene
  }

  /**
   * this.finishedのゲッター
   */
  public get isFinished() {
    return this.finished
  }

  public behave(): void {
    if (!this.started && this.scene) {
      this.scene.container.addChild(this.container)
    }
    super.behave()
    if (this.finished) {
      this.onFinished()
    }
  }
}

export default Transition
