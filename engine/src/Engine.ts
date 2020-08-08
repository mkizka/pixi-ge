import * as PIXI from 'pixi.js'
import Scene from './Scene'

/**
 * ゲーム全体のマネージャ
 */
class Engine {
  /**
   * PIXI.Applicationインスタンス
   */
  public app = new PIXI.Application()
  /**
   * 最初に開始されるシーンを設定しておく
   */
  public scene: Scene | null = null

  /**
   * 現在のシーンをステージから削除して次のシーンの描画を準備する
   * @param newScene 次のシーン
   */
  public setScene(newScene: Scene): void {
    if (this.scene) {
      this.app.stage.removeChild(this.scene.container)
    }
    this.app.stage.addChild(newScene.container)
    this.scene = newScene
  }

  /**
   * this.startで登録されるメインループ
   */
  protected mainLoop(): void {
    if (this.scene) {
      this.scene.behave()
    }
  }

  /**
   * ゲームの描画を開始する
   */
  public run(element: Element = document.body): void {
    element.appendChild(this.app.view)
    this.app.ticker.add(_ => this.mainLoop())
  }
}

export default Engine
