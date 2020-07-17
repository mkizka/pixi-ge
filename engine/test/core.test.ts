import * as PIXI from 'pixi.js'
import { Game, Actor, Scene } from '../src'

let app: PIXI.Application

beforeEach(() => {
  PIXI.utils.skipHello()
  app = new PIXI.Application()
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
      expect(el.children).toContain(app.view)
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

  describe('Scene', () => {
    it('トランジション管理', () => {
      const scene = new Scene()
      scene.behave()
      expect(scene.transitionIn.isStarted).toBe(true)
      scene.startOut()
      scene.behave()
      expect(scene.transitionOut.isStarted).toBe(true)
    })
  })
})
