import * as PIXI from 'pixi.js'
import Scene from './core/Scene'

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
    return this._app
  }

  /**
   * 現在のシーンインスタンス
   */
  private currentScene: Scene | undefined

  /**
   * 現在のシーンインスタンスを取得する
   */
  public getCurrentScene(): Scene | undefined {
    return this.currentScene
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
    if (this.currentScene) {
      this.currentScene.behave()
    }
  }

  /**
   * ゲームの描画を開始する
   */
  public start(element: Element = document.body): void {
    element.appendChild(Game.app.view)
    Game.app.ticker.add(_ => this.mainLoop())
  }

  /**
   * シーンをロードする
   * 新しいシーンのリソース読み込みと古いシーンのトランジションを同時に開始する
   * いずれも完了したら、新しいシーンのトランジションを開始する
   */
  public async loadScene(newScene: Scene): Promise<void> {
    const startNewScene = (): void => {
      this.currentScene = newScene
      Game.app.stage.addChild(newScene.container)
    }
    if (this.currentScene) {
      this.currentScene.startOut(() => {
        this.currentScene?.container.destroy()
        startNewScene()
      })
    } else {
      startNewScene()
    }
  }
}
