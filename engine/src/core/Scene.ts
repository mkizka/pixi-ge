import * as PIXI from 'pixi.js'
import Transition from '../transitions/base/Transition'
import Immediate from '../transitions/Immediate'
import Updatable from './base/Updatable'
import Actor from './Actor'

/**
 * ゲームシーンの抽象クラス
 */
export default class Scene extends Updatable {
  /**
   * PIXI.Containerインスタンス
   */
  public readonly container: PIXI.Container = new PIXI.Container()

  /**
   * シーン開始用のトランジションオブジェクト
   */
  public readonly transitionIn: Transition = new Immediate()

  /**
   * シーン終了用のトランジションオブジェクト
   */
  public readonly transitionOut: Transition = new Immediate()

  /**
   * シーン終了時に1度だけ呼び出されるメソッド
   */
  public startOut(onTransitionFinished?: () => void): void {
    this.addObject(this.transitionOut)
    if (onTransitionFinished) {
      this.transitionOut.onFinished = onTransitionFinished
    }
  }

  protected start(): void {
    this.addObject(this.transitionIn)
  }

  public addObject(updatable: Updatable | Actor | Transition): void {
    super.addObject(updatable)
    if (updatable instanceof Actor) {
      this.container.addChild(updatable.sprite)
    }
    if (updatable instanceof Transition) {
      this.container.addChild(updatable.overlay)
    }
  }
}
