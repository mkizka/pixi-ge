import * as PIXI from 'pixi.js'
import Scene from './Scene'

/**
 * ゲーム全体のマネージャ
 * 主にシーンを扱う
 */
export default class GameManager {
  /**
   * シングルトンインスタンス
   */
  private static instance: GameManager

  /**
   * シングルトンインスタンスを取得する
   */
  public static getInstance() {
    return GameManager.instance
  }

  /**
   * PIXI.Application インスタンス
   * 初期化時に生成される
   */
  private app: PIXI.Application

  public static getApp(): PIXI.Application {
    return GameManager.instance.app
  }

  /**
   * シーンのトランジション完了フラグ
   * シーントランジションを制御するためのフラグ
   */
  private sceneTransitionOutFinished: boolean = true
  /**
   * 現在のシーンインスタンス
   */
  private currentScene: Scene | undefined

  private sceneResourceLoaded: boolean = true

  /**
   * コンストラクタ
   */
  private constructor(app: PIXI.Application) {
    if (GameManager.instance) {
      throw new Error('GameManager can be instantiate only once')
    }
    this.app = app
  }

  /**
   * ゲームを起動する
   * 画面サイズや PIXI.ApplicationOptions を渡すことができる
   */
  public static startApp(app: PIXI.Application): void {
    app.loader.baseUrl = 'assets/'
    const instance = new GameManager(app)
    GameManager.instance = instance
    document.body.appendChild(app.view)

    // メインループ
    app.ticker.add(() => {
      if (instance.currentScene) {
        instance.currentScene.update()
      }
    })
  }

  /**
   * 可能であれば新しいシーンへのトランジションを開始する
   */
  public static transitionInIfPossible(newScene: Scene): boolean {
    const instance = GameManager.instance

    if (!instance.sceneResourceLoaded || !instance.sceneTransitionOutFinished) {
      return false
    }

    if (instance.currentScene) {
      instance.currentScene.destroy()
    }
    instance.currentScene = newScene

    if (instance.app) {
      instance.app.stage.addChild(newScene)
    }

    newScene.beginTransitionIn((_: Scene) => {})

    return true
  }

  /**
   * シーンをロードする
   * 新しいシーンのリソース読み込みと古いシーンのトランジションを同時に開始する
   * いずれも完了したら、新しいシーンのトランジションを開始する
   */
  public static loadScene(newScene: Scene): void {
    const instance = GameManager.instance

    if (instance.currentScene) {
      instance.sceneResourceLoaded = false
      instance.sceneTransitionOutFinished = false
      newScene.beginLoadResource(() => {
        instance.sceneResourceLoaded = true
        GameManager.transitionInIfPossible(newScene)
      })
      instance.currentScene.beginTransitionOut(() => {
        instance.sceneTransitionOutFinished = true
        GameManager.transitionInIfPossible(newScene)
      })
    } else {
      instance.sceneTransitionOutFinished = true
      newScene.beginLoadResource(() => {
        instance.sceneResourceLoaded = true
        GameManager.transitionInIfPossible(newScene)
      })
    }
  }
}
