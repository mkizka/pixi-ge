import * as PIXI from 'pixi.js'
import Transition from '../transitions/base/Transition'
import Immediate from '../transitions/Immediate'
import GameObject from './GameObject'
import GameManager from './GameManager'

/**
 * 渡されたアセットのリストからロード済みのものをフィルタリングする
 */
const filterLoadedAssets = (assets: string[]): string[] => {
  const filteredAssets: string[] = []
  const app = GameManager.getApp()

  for (const asset of assets) {
    if (!app.loader.resources[asset] && !filteredAssets.includes(asset)) {
      filteredAssets.push(asset)
    }
  }

  return filteredAssets
}

/**
 * ゲームシーンの抽象クラス
 */
export default abstract class Scene extends PIXI.Container {
  /**
   * 更新すべきオブジェクトを保持する
   */
  protected objectsToUpdate: GameObject[] = []

  /**
   * 経過フレーム数
   */
  protected elapsedFrameCount: number = 0

  /**
   * シーン開始用のトランジションオブジェクト
   */
  protected transitionIn: Transition = new Immediate()
  /**
   * シーン終了用のトランジションオブジェクト
   */
  protected transitionOut: Transition = new Immediate()

  /**
   * loadInitialResource に用いるリソースリストを作成するメソッド
   */
  protected getInitialResources(): string[] {
    return []
  }

  /**
   * リソースダウンロードのフローを実行する
   */
  public beginLoadResource(onLoaded: () => void): Promise<void> {
    return new Promise(resolve => {
      this.loadInitialResource(() => resolve())
    })
      .then(() => {
        return new Promise(resolve => {
          const additionalAssets = this.onInitialResourceLoaded()
          this.loadAdditionalResource(additionalAssets, () => resolve())
        })
      })
      .then(() => {
        this.onAdditionalResourceLoaded()
        onLoaded()
        this.onResourceLoaded()
      })
  }

  /**
   * 初回リソースのロードを行う
   */
  protected loadInitialResource(onLoaded: () => void): void {
    const assets = this.getInitialResources()
    const filteredAssets = filterLoadedAssets(assets)
    const app = GameManager.getApp()

    if (filteredAssets.length > 0) {
      app.loader.add(filteredAssets).load(() => onLoaded())
    } else {
      onLoaded()
    }
  }

  /**
   * loadInitialResource 完了時のコールバックメソッド
   * 追加でロードしなければならないテクスチャなどの情報を返す
   */
  protected onInitialResourceLoaded(): string[] {
    return []
  }

  /**
   * onInitialResourceLoaded で発生した追加のリソースをロードする
   */
  protected loadAdditionalResource(assets: string[], onLoaded: () => void) {
    const app = GameManager.getApp()
    app.loader.add(filterLoadedAssets(assets)).load(() => onLoaded())
  }

  /**
   * 追加のリソースロード完了時のコールバック
   */
  protected onAdditionalResourceLoaded(): void {
    // 抽象クラスでは何もしない
  }

  /**
   * beginLoadResource 完了時のコールバックメソッド
   */
  protected onResourceLoaded(): void {}

  /**
   * GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
   */
  public update(delta: number): void {
    this.elapsedFrameCount++

    this.updateRegisteredObjects(delta)

    if (this.transitionIn.isActive()) {
      this.transitionIn.update(delta)
    } else if (this.transitionOut.isActive()) {
      this.transitionOut.update(delta)
    }
  }

  /**
   * 更新処理を行うべきオブジェクトとして渡されたオブジェクトを登録する
   */
  protected pushObjectsToUpdate(object: GameObject): void {
    this.objectsToUpdate.push(object)
  }

  /**
   * 更新処理を行うべきオブジェクトを更新する
   */
  protected updateRegisteredObjects(delta: number): void {
    const nextObjectsToUpdate = []

    for (const obj of this.objectsToUpdate) {
      if (!obj || obj.isDestroyed) {
        continue
      }
      obj.update(delta)
      nextObjectsToUpdate.push(obj)
    }

    this.objectsToUpdate = nextObjectsToUpdate
  }

  /**
   * シーン追加トランジション開始
   * 引数でトランジション終了時のコールバックを指定できる
   */
  public beginTransitionIn(onTransitionFinished: (scene: Scene) => void): void {
    this.transitionIn.setCallback(() => onTransitionFinished(this))

    const container = this.transitionIn.getContainer()
    if (container) {
      this.addChild(container)
    }

    this.transitionIn.begin()
  }

  /**
   * シーン削除トランジション開始
   * 引数でトランジション終了時のコールバックを指定できる
   */
  public beginTransitionOut(
    onTransitionFinished: (scene: Scene) => void
  ): void {
    this.transitionOut.setCallback(() => onTransitionFinished(this))

    const container = this.transitionOut.getContainer()
    if (container) {
      this.addChild(container)
    }

    this.transitionOut.begin()
  }
}
