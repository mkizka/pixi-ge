import * as PIXI from 'pixi.js'
import SceneManager from './SceneManager'
/**
 * ゲーム全体のマネージャ
 */
class Game {
  private static _app: PIXI.Application | null

  /**
   * this._appのgetter
   */
  public static get app(): PIXI.Application {
    if (Game._app) {
      return Game._app
    }
    throw Error('startが呼ばれていません')
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
  protected static mainLoop(): void {
    const { stage } = Game.app
    if (SceneManager.scene) {
      if (!stage.children.includes(SceneManager.scene)) {
        stage.addChild(SceneManager.scene)
      }
      SceneManager.scene.behave()
    }
  }

  /**
   * ゲームの描画を開始する
   */
  public static start(element: Element = document.body): void {
    element.appendChild(Game.app.view)
    Game.app.ticker.add(_ => Game.mainLoop())
  }
}

export default Game
