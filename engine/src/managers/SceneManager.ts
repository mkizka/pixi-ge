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
   * 新しいシーンのリソース読み込みと古いシーンのトランジションを同時に開始する
   * いずれも完了したら、新しいシーンのトランジションを開始する
   */
  public static loadScene(newScene: Scene): void {
    const startNewScene = (): void => {
      SceneManager._scene = newScene
    }
    if (SceneManager.scene) {
      SceneManager.scene.startOut(() => {
        SceneManager.scene?.container.destroy()
        startNewScene()
      })
    } else {
      startNewScene()
    }
  }
}
