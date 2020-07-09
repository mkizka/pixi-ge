import * as PIXI from 'pixi.js'
import { Scene, Immediate } from '../../src'

PIXI.utils.skipHello()
const app = new PIXI.Application()

describe('Transition', () => {
  it('インスタンス作成', () => {
    class TestScene extends Scene {}
    const scene = new TestScene(app)
    const immediate = new Immediate(scene)
    immediate.behave()
    expect(immediate.isFinished).toBe(true)
  })
})
