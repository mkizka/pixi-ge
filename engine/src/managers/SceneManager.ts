import Scene from '../core/Scene'

export default class SceneManager {
  /**
   * 現在のシーンインスタンス
   */
  private static _scene: Scene | null

  /**
   * 現在のシーンインスタンスを取得する
   */
  public static get scene(): Scene | null {
    return SceneManager._scene
  }

  /**
   * シーンをロードする
   */
  public static loadScene(newScene: Scene): void {
    if (SceneManager.scene) {
      SceneManager.scene.startOut(() => {
        SceneManager._scene?.container.destroy()
        SceneManager._scene = newScene
      })
    } else {
      SceneManager._scene = newScene
    }
  }
}
