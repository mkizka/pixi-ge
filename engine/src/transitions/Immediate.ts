import * as PIXI from 'pixi.js'
import Transition from './base/Transition'

/**
 * 即座にシーン遷移させるトランジション
 */
export default class Immediate extends Transition {
  /**
   * トランジション描画物を含む PIXI.Container インスタンスを返す
   */
  public getContainer(): PIXI.Container | null {
    return null
  }

  /**
   * 即時終了させる
   */
  public update() {
    super.update()
    super.finished = true
  }
}
