import SceneManager from '../src/managers/SceneManager'
import { Scene } from '../src'

describe('managers', () => {
  describe('SceneManager', () => {
    it('シーン登録', () => {
      const scene = new Scene()
      SceneManager.loadScene(new Scene())
      expect(SceneManager.scene).toBe(scene)
    })

    it('シーン遷移', () => {
      const firstScene = new Scene()
      const secondScene = new Scene()
      SceneManager.loadScene(firstScene)
      SceneManager.loadScene(secondScene)
      expect(SceneManager.scene).toBe(secondScene)
    })
  })
})
