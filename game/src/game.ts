import * as PIXI from 'pixi.js'
import { GameManager, Scene, Fade } from 'pixi-ge'

GameManager.startApp(
  new PIXI.Application({
    width: 400,
    height: 400,
    backgroundColor: 0x000000
  })
)

class FirstScene extends Scene {
  private text!: PIXI.Text
  private count: number = 0

  constructor() {
    super()

    this.transitionIn = new Fade(1.0, 0.0, -0.01)
    this.transitionOut = new Fade(0.0, 1.0, 0.01)

    const textStyle = new PIXI.TextStyle({
      fontSize: 64,
      fill: 0xffffff
    })

    const renderer = GameManager.getApp().renderer
    this.text = new PIXI.Text('first scene', textStyle)
    this.text.interactive = true
    this.text.anchor.set(0.5, 0.5)
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5)
    this.addChild(this.text)

    this.text.on('pointerdown', () => GameManager.loadScene(new SecondScene()))
  }

  public update(dt: number): void {
    super.update(dt)
    this.text.text = `first scene\n${this.count++}`
  }
}

class SecondScene extends Scene {
  private text!: PIXI.Text
  private count: number = 0

  constructor() {
    super()

    const textStyle = new PIXI.TextStyle({
      fontSize: 64,
      fill: 0xffffff
    })
    const renderer = GameManager.getApp().renderer
    this.text = new PIXI.Text('second scene', textStyle)
    this.text.interactive = true
    this.text.anchor.set(0.5, 0.5)
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5)
    this.addChild(this.text)

    this.text.on('pointerdown', () => GameManager.loadScene(new FirstScene()))
  }

  public update(dt: number): void {
    this.text.text = `second scene\n${this.count++}`
  }
}

GameManager.loadScene(new FirstScene())