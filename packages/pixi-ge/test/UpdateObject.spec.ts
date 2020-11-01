import { UpdateObject } from '../src'

describe('UpdateObject', () => {
  it('メインループでstartが一回、updateが毎回呼ばれる', () => {
    class Counter extends UpdateObject {
      startCount = 0
      updateCount = 0

      start() {
        this.startCount++
      }

      update() {
        this.updateCount++
      }
    }
    const counter = new Counter()
    const behaveCount = 3
    for (let i = 0; i < behaveCount; i++) {
      counter.behave()
    }
    expect(counter.startCount).toBe(1)
    expect(counter.updateCount).toBe(behaveCount)
  })
  it('子要素の登録時にメインループに登録される', () => {
    const parent = new UpdateObject()
    const child = new UpdateObject()
    parent.addChild(child)
    parent.behave()
    expect(parent.isStarted).toBe(true)
    expect(child.isStarted).toBe(true)
  })
  it('親要素の削除時に子要素も削除される', () => {
    const parent = new UpdateObject()
    const child = new UpdateObject()
    parent.addChild(child)
    parent.destroy()
    expect(parent.isDestroyed).toBe(true)
    expect(child.isDestroyed).toBe(true)
  })
})
