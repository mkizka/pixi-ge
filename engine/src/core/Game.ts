import * as PIXI from 'pixi.js'
import Scene from './Scene'

/**
 * ゲーム全体のマネージャ
 * 主にシーンを扱う
 */
export default class Game {
  /**
   * PIXI.Application インスタンス
   * 初期化時に生成される
   */
  public readonly app: PIXI.Application

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
    app.loader.baseUrl = 'assets/'
    app.ticker.add(_ => {
      if (this.currentScene) {
        this.currentScene.behave()
      }
    })
    this.app = app
  }

  /**
   * ゲームの描画を開始する
   */
  public start(element?: Element) {
    if (element) {
      element.appendChild(this.app.view)
    }
    document.body.appendChild(this.app.view)
  }

  /**
   * シーンをロードする
   * 新しいシーンのリソース読み込みと古いシーンのトランジションを同時に開始する
   * いずれも完了したら、新しいシーンのトランジションを開始する
   */
  public async loadScene(newScene: Scene): Promise<void> {
    const startNewScene = () => {
      this.currentScene = newScene
      this.app.stage.addChild(newScene.container)
    }
    if (this.currentScene) {
      this.currentScene.startOut(() => {
        this.currentScene!.container.destroy()
        startNewScene()
      })
    } else {
      startNewScene()
    }
  }
}
