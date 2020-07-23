import Scene from './Scene'

class SceneManager {
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
    SceneManager._scene = newScene
  }
}

export default SceneManager
