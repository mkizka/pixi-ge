import * as PIXI from 'pixi.js'
import { Container } from 'pixi.js'
import Scene from '../../core/Scene'

/**
 * 即座にシーン遷移させるトランジション
 */
abstract class Transition {
  protected started: boolean = false
  protected finished: boolean = false
  protected container = new Container()
  protected scene: Scene
  public onFinished: () => void = () => {}

  constructor(scene: Scene) {
    this.scene = scene
  }

  /**
   * トランジション描画物を含む PIXI.Container インスタンスを返す
   * 不要な場合はnullを返すようにオーバーライドする
   */
  public getContainer(): PIXI.Container | null {
    return this.container
  }

  public get isStarted(): boolean {
    return this.started
  }

  public get isFinished(): boolean {
    return this.finished
  }

  /**
   * トランジション開始処理
   */
  public start(): void {
    this.started = true
  }

  /**
   * Sceneによって毎フレーム呼び出される
   */
  public update(): void {
    if (this.finished) {
      this.onFinished()
      this.container.destroy()
    }
  }
}

export default Transition
