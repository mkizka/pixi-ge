import * as PIXI from 'pixi.js'
import { Scene, Immediate, Fade } from '../src'

let scene: Scene
let app: PIXI.Application

beforeEach(() => {
  app = new PIXI.Application()
  class TestScene extends Scene {}
  scene = new TestScene()
})

describe('transitions', () => {
  describe('Immediate', () => {
    it('即時終了', () => {
      const immediate = new Immediate(scene)
      immediate.behave()
      expect(immediate.isFinished).toBe(true)
    })
  })
  describe('Fade', () => {
    it('フェードイン', () => {
      const fade = new Fade(scene, app.view, {
        from: 1,
        to: 0,
        progress: -(1 / 10)
      })
      for (let i = 0; i < 12; i++) {
        fade.behave()
      }
      expect(fade.isFinished).toBe(true)
    })
    it('フェードアウト', () => {
      const fade = new Fade(scene, app.view, {
        from: 0,
        to: 1,
        progress: 1 / 10
      })
      for (let i = 0; i < 12; i++) {
        fade.behave()
      }
      expect(fade.isFinished).toBe(true)
    })
  })
})
