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
  protected transitionIn: Transition = new Immediate()

  /**
   * シーン終了用のトランジションオブジェクト
   */
  protected transitionOut: Transition = new Immediate()

  /**
   * シーン開始時に1度だけ呼び出されるメソッド
   */
  public startIn(): void {
    this.addObject(this.transitionIn)
  }

  /**
   * シーン終了時に1度だけ呼び出されるメソッド
   */
  public startOut(onTransitionFinished: () => void): void {
    this.addObject(this.transitionOut)
    if (onTransitionFinished) {
      this.transitionOut.onFinished = onTransitionFinished
    }
  }

  public start(): void {
    this.startIn()
  }

  addObject(updatable: Updatable | Actor | Transition): void {
    super.addObject(updatable)
    if (updatable instanceof Actor) {
      this.container.addChild(updatable.sprite)
    }
    if (updatable instanceof Transition) {
      this.container.addChild(updatable.container)
    }
  }
}
