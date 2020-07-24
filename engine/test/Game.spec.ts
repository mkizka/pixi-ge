import { Game } from '../src'

describe('Game', () => {
  afterEach(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    if (canvas) canvas.remove()
  })
  it('開始時にdocument.bodyにcanvasを登録する', () => {
    const game = new Game()
    game.run()
    expect(document.body.children).toContain(game.view)
  })
  it('開始時にDOM要素にcanvasを登録する', () => {
    const game = new Game()
    const el = document.createElement('div')
    game.run(el)
    expect(el.children).toContain(game.view)
  })
  it('開始時にシーン描画をメインループを登録する', () => {
    const game = new Game()
    game.run()
    game.scene.behave = jest.fn()
    game.ticker.update()
    expect(game.scene.behave).toBeCalled()
  })
})
