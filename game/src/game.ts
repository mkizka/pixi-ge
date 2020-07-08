import * as PIXI from 'pixi.js'
import { Game, Scene, Fade } from 'pixi-ge'

const app =  new PIXI.Application({
  width: 400,
  height: 400,
  backgroundColor: 0x000000
})
const game = new Game(app)

class FirstScene extends Scene {
  private text!: PIXI.Text
  private count: number = 0

  constructor() {
    super(app)
    this.transitionIn = new Fade(this, {from: 1.0, to:0.0, progress:-0.01})
    this.transitionOut = new Fade(this, {from:0.0, to:1.0, progress:0.01})

    const textStyle = new PIXI.TextStyle({
      fontSize: 64,
      fill: 0xffffff
    })

    const renderer = app.renderer
    this.text = new PIXI.Text('first scene', textStyle)
    this.text.interactive = true
    this.text.anchor.set(0.5, 0.5)
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5)
    this.container.addChild(this.text)

    this.text.on('pointerdown', () => game.loadScene(new SecondScene()))
  }

  public update(): void {
    this.text.text = `first scene\n${this.count++}`
  }
}

class SecondScene extends Scene {
  private text!: PIXI.Text
  private count: number = 0

  constructor() {
    super(app)

    const textStyle = new PIXI.TextStyle({
      fontSize: 64,
      fill: 0xffffff
    })
    const renderer = app.renderer
    this.text = new PIXI.Text('second scene', textStyle)
    this.text.interactive = true
    this.text.anchor.set(0.5, 0.5)
    this.text.position.set(renderer.width * 0.5, renderer.height * 0.5)
    this.container.addChild(this.text)

    this.text.on('pointerdown', () => game.loadScene(new FirstScene()))
  }

  public update(): void {
    this.text.text = `second scene\n${this.count++}`
  }
}

game.start()
game.loadScene(new FirstScene())
