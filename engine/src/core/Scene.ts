import * as PIXI from 'pixi.js'
import Transition from '../transitions/base/Transition'
import Immediate from '../transitions/Immediate'
import GameObject from './base/GameObject'

/**
 * ゲームシーンの抽象クラス
 */
export default abstract class Scene extends GameObject {
  /**
   * PIXI.Applicationインスタンス
   */
  public readonly app: PIXI.Application

  /**
   * シーン開始時に読み込まれるリソースのリスト
   */
  protected assets: string[] = []

  /**
   * シーン開始用のトランジションオブジェクト
   */
  protected transitionIn: Transition

  /**
   * シーン終了用のトランジションオブジェクト
   */
  protected transitionOut: Transition

  protected constructor(app: PIXI.Application) {
    super()
    this.app = app
    this.transitionIn = new Immediate(this)
    this.transitionOut = new Immediate(this)
  }

  /**
   * リソースを読み込む
   */
  public loadResource(): Promise<void> {
    const filteredAssets = this.filterLoadedAssets(this.assets)
    return new Promise<void>(resolve => {
      this.app.loader.add(filteredAssets).load(() => resolve())
    })
  }

  /**
   * 渡されたアセットのリストからロード済みのものをフィルタリングする
   */
  private filterLoadedAssets(assets: string[]): string[] {
    const filteredAssets: string[] = []

    for (const asset of assets) {
      if (
        !this.app.loader.resources[asset] &&
        !filteredAssets.includes(asset)
      ) {
        filteredAssets.push(asset)
      }
    }

    return filteredAssets
  }

  /**
   * シーン開始時に1度だけ呼び出されるメソッド
   */
  public startIn(): void {
    const container = this.transitionIn.getContainer()
    if (container) {
      this.addChild(container)
    }
    this.transitionIn.start()
  }

  /**
   * シーン終了時に1度だけ呼び出されるメソッド
   */
  public startOut(onTransitionFinished?: () => void): void {
    const container = this.transitionOut.getContainer()
    if (container) {
      this.addChild(container)
    }
    this.transitionOut.start()
    if (onTransitionFinished) {
      this.transitionOut.onFinished = onTransitionFinished
    }
  }

  public start() {
    this.startIn()
  }

  /**
   * GameによってrequestAnimationFrame毎に呼び出されるメソッド
   */
  public update(): void {
    if (this.transitionIn.isStarted) {
      this.transitionIn.update()
    }

    if (this.transitionOut.isStarted) {
      this.transitionOut.update()
      if (this.transitionOut.isFinished) {
        this.destroy()
      }
    }
  }
}
