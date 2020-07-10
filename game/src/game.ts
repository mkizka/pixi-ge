import * as PIXI from 'pixi.js'
import { Game, Scene, Actor, Fade } from 'pixi-ge'

const app = new PIXI.Application({
  width: 400,
  height: 400,
  backgroundColor: 0x1099bb
})

class Bunny extends Actor {
  public start() {
    this.sprite.texture = PIXI.Sprite.from('https://pixijs.io/examples/examples/assets/bunny.png').texture
    this.sprite.x = app.screen.width / 2
    this.sprite.y = app.screen.height / 2
    this.sprite.anchor.set(0.5)
  }

  public update() {
    this.sprite.rotation -= 0.1
  }
}

class SampleScene extends Scene {
  constructor() {
    super()
    this.transitionIn = new Fade(this, app.view, {
      from: 1.0,
      to: 0.1,
      progress: -0.01
    })
    this.addObject(new Bunny())
  }
}

const game = new Game(app)
game.start()
game.loadScene(new SampleScene())
