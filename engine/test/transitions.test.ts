import { Immediate, Fade } from '../src'

describe('transitions', () => {
  describe('Immediate', () => {
    it('即時終了', () => {
      const immediate = new Immediate()
      immediate.behave()
      expect(immediate.isFinished).toBe(true)
    })
  })

  describe('Fade', () => {
    it('フェードイン', () => {
      const fade = new Fade({
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
      const fade = new Fade({
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
