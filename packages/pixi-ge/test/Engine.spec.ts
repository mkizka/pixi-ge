import { Engine, Scene } from '../src'

describe('Engine', () => {
  afterEach(() => {
    const canvas = document.querySelector<HTMLCanvasElement>('canvas')
    if (canvas) canvas.remove()
  })
  it('開始時にdocument.bodyにcanvasを登録する', () => {
    const engine = new Engine()
    engine.run()
    expect(document.body.children).toContain(engine.app.view)
  })
  it('開始時にDOM要素にcanvasを登録する', () => {
    const engine = new Engine()
    const el = document.createElement('div')
    engine.run(el)
    expect(el.children).toContain(engine.app.view)
  })
  it('setSceneでシーンのコンテナをステージに登録', () => {
    const engine = new Engine()
    const firstScene = new Scene()
    const secondScene = new Scene()
    engine.setScene(firstScene)
    expect(engine.scene).not.toBe(null)
    expect(engine.app.stage.children).toContain(firstScene.container)
    engine.setScene(secondScene)
    expect(engine.app.stage.children).not.toContain(firstScene.container)
    expect(engine.app.stage.children).toContain(secondScene.container)
  })
  it('setSceneでシーン描画をメインループに登録する', () => {
    const engine = new Engine()
    engine.run()
    const firstScene = new Scene()
    const secondScene = new Scene()
    firstScene.behave = jest.fn()
    secondScene.behave = jest.fn()
    engine.setScene(firstScene)
    engine.app.ticker.update()
    engine.setScene(secondScene)
    engine.app.ticker.update()
    expect(firstScene.behave).toBeCalledTimes(1)
    expect(secondScene.behave).toBeCalledTimes(1)
  })
})
