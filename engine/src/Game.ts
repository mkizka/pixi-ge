import * as PIXI from 'pixi.js'
import SceneManager from './managers/SceneManager'

/**
 * ゲーム全体のマネージャ
 * 主にシーンを扱う
 */
export default class Game {
  /**
   * PIXI.Application インスタンス
   */
  private static _app: PIXI.Application = new PIXI.Application()

  /**
   * this._appのgetter
   */
  public static get app(): PIXI.Application {
    return Game._app
  }

  /**
   * コンストラクタ
   */
  constructor(app: PIXI.Application) {
    Game._app = app
  }

  /**
   * this.startで登録されるメインループ
   */
  protected mainLoop(): void {
    if (SceneManager.scene) {
      SceneManager.scene.behave()
    }
  }

  /**
   * ゲームの描画を開始する
   */
  public start(element: Element = document.body): void {
    element.appendChild(Game.app.view)
    Game.app.ticker.add(_ => this.mainLoop())
  }
}
