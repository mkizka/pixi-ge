import * as PIXI from 'pixi.js'
import { Game, Scene } from '../src'

PIXI.utils.skipHello()

let scene: Scene
let app: PIXI.Application
class TestScene extends Scene {}

beforeEach(() => {
  app = new PIXI.Application()
  scene = new TestScene()
})

afterEach(() => {
  const canvas = document.querySelector('canvas')
  if (canvas) canvas.remove()
})

describe('core', () => {
  let game: Game
  beforeEach(() => {
    game = new Game(app)
  })

  describe('Game', () => {
    it('シーン読み込み', () => {
      game.loadScene(scene)
      game.app.ticker.update()
      expect(game.app.stage.children.length).toBe(1)
      expect(game.getCurrentScene()).not.toBe(undefined)
      expect(game.getCurrentScene()!).toBe(scene)
    })

    it('シーン遷移', () => {
      const scene2 = new TestScene()
      game.loadScene(scene)
      game.app.ticker.update()
      game.loadScene(scene2)
      game.app.ticker.update()
      expect(app.stage.children.length).toBe(1)
      expect(game.getCurrentScene()).not.toBe(undefined)
      expect(game.getCurrentScene()!).toBe(scene2)
    })

    it('登録シーンがメインループで動作', () => {
      game.loadScene(scene)
      game.app.ticker.update()
      expect(game.getCurrentScene()).not.toBe(undefined)
      expect(game.getCurrentScene()!.isStarted).toBe(true)
    })
  })
})
