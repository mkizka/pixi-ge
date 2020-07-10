import * as PIXI from 'pixi.js'
import Transition from '../transitions/base/Transition'
import Immediate from '../transitions/Immediate'
import Updatable from './base/Updatable'

/**
 * ゲームシーンの抽象クラス
 */
export default abstract class Scene extends Updatable {
  /**
   * PIXI.Containerインスタンス
   */
  public readonly container: PIXI.Container = new PIXI.Container()

  /**
   * シーン開始用のトランジションオブジェクト
   */
  protected transitionIn: Transition

  /**
   * シーン終了用のトランジションオブジェクト
   */
  protected transitionOut: Transition

  constructor() {
    super()
    this.transitionIn = new Immediate(this)
    this.transitionOut = new Immediate(this)
  }

  /**
   * シーン開始時に1度だけ呼び出されるメソッド
   */
  public startIn(): void {
    this.addObject(this.transitionIn)
  }

  /**
   * シーン終了時に1度だけ呼び出されるメソッド
   */
  public startOut(onTransitionFinished?: () => void): void {
    this.addObject(this.transitionOut)
    if (onTransitionFinished) {
      this.transitionOut.onFinished = onTransitionFinished
    }
  }

  public start() {
    this.startIn()
  }
}
