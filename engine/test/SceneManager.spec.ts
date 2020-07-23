import { SceneManager, Scene } from '../src'

describe('SceneManager', () => {
  it('シーンの登録と遷移', () => {
    const firstScene = new Scene()
    SceneManager.loadScene(firstScene)
    expect(SceneManager.scene).toBe(firstScene)
    const secondScene = new Scene()
    SceneManager.loadScene(secondScene)
    expect(SceneManager.scene).toBe(secondScene)
  })
})
