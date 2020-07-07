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
   * シーン開始用のトランジションオブジェクト
   */
  protected transitionIn: Transition = new Immediate()

  /**
   * シーン終了用のトランジションオブジェクト
   */
  protected transitionOut: Transition = new Immediate()

  /**
   * リソースロードを読み込む
   */
  protected loadResource(assets: string[], onLoaded: () => void): void {
    const filteredAssets = filterLoadedAssets(assets)
    const app = GameManager.getApp()
    app.loader.add(filteredAssets).load(() => onLoaded())
  }

  /**
   * GameManager によって requestAnimationFrame 毎に呼び出されるメソッド
   */
  public update(): void {
    this.updateRegisteredObjects()

    if (this.transitionIn.isStarted) {
      this.transitionIn.update()
    }
    if (this.transitionOut.isStarted) {
      this.transitionOut.update()
    }
  }

  /**
   * 更新処理を行うべきオブジェクトとして渡されたオブジェクトを登録する
   */
  protected addObject(object: GameObject): void {
    this.objectsToUpdate.push(object)
  }

  /**
   * 更新処理を行うべきオブジェクトを更新する
   */
  protected updateRegisteredObjects(): void {
    const nextObjectsToUpdate = []

    for (const obj of this.objectsToUpdate) {
      if (!obj || obj.isDestroyed) {
        continue
      }
      obj.update()
      nextObjectsToUpdate.push(obj)
    }

    this.objectsToUpdate = nextObjectsToUpdate
  }
}
