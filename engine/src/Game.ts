import * as PIXI from 'pixi.js'
import Scene from './Scene'

/**
 * ゲーム全体のマネージャ
 */
class Game extends PIXI.Application {
  /**
   * 最初に開始されるシーンを設定しておく
   */
  private _scene: Scene = new Scene()

  public get scene(): Scene {
    return this._scene
  }

  /**
   * this.startで登録されるメインループ
   */
  protected mainLoop(): void {
    if (!this.stage.children.includes(this.scene.container)) {
      this.stage.addChild(this.scene.container)
    }
    this.scene.behave()
  }

  /**
   * ゲームの描画を開始する
   */
  public run(element: Element = document.body): void {
    element.appendChild(this.view)
    this.ticker.add(_ => this.mainLoop())
  }
}

export default Game
