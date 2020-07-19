import SceneManager from '../src/managers/SceneManager'
import { Scene } from '../src'

describe('managers', () => {
  describe('SceneManager', () => {
    it('シーン登録と遷移', () => {
      const firstScene = new Scene()
      const secondScene = new Scene()
      SceneManager.loadScene(firstScene)
      firstScene.behave()
      expect(SceneManager.scene).toBe(firstScene)
      SceneManager.loadScene(secondScene)
      firstScene.behave() // シーン1を動作させてトランジションを終了させ、次のシーンに移る
      expect(SceneManager.scene).toBe(secondScene)
    })
  })
})
