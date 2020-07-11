import * as PIXI from 'pixi.js'
import { Game, Scene } from '../src'
import Actor from '../src/core/Actor'

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
    it('DOM要素への登録', () => {
      const el = document.createElement('div')
      game.start(el)
      expect(el.children).toContain(game.app.view)
    })

    it('シーン読み込み', () => {
      game.start()
      game.loadScene(scene)
      game.app.ticker.update()
      expect(game.app.stage.children.length).toBe(1)
      expect(game.getCurrentScene()).not.toBe(undefined)
      expect(game.getCurrentScene()!).toBe(scene)
    })

    it('シーン遷移', () => {
      game.start()
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
      game.start()
      game.loadScene(scene)
      game.app.ticker.update()
      expect(game.getCurrentScene()).not.toBe(undefined)
      expect(game.getCurrentScene()!.isStarted).toBe(true)
    })
  })

  describe('Actor', () => {
    it('子要素のコンテナ登録', () => {
      const parent = new Actor()
      const child = new Actor()
      parent.addObject(child)
      expect(parent.sprite.children).toContain(child.sprite)
    })
  })
})
