import Transition from './base/Transition'

/**
 * 即座にシーン遷移させるトランジション
 */
export default class Immediate extends Transition {
  /**
   * 即時終了させる
   */
  public update() {
    this.finished = true
  }
}
