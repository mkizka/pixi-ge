import * as PIXI from 'pixi.js'
import { Game, Scene, UpdateObject } from 'pixi-ge'

const wrapper = document.body.querySelector<HTMLDivElement>(
  '#wrapper'
) as HTMLDivElement

class MyActor extends UpdateObject<PIXI.Sprite> {
  constructor() {
    super()
    this.container = PIXI.Sprite.from(
      'https://pixijs.io/examples/examples/assets/bunny.png'
    )
  }

  update() {
    this.container.x += 1
    this.container.y += 1
  }
}

class MyScene extends Scene {
  start() {
    this.addChild(new MyActor())
  }
}

class MyGame extends Game {
  public scene = new MyScene()
  constructor() {
    super({
      resizeTo: wrapper,
      backgroundColor: 0x1099bb
    })
  }
}

const game = new MyGame()
game.run(wrapper)
