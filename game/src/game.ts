import * as PIXI from 'pixi.js'
import { Engine, Scene, UpdateObject } from 'pixi-ge'

const wrapper = document.body.querySelector<HTMLDivElement>(
  '#wrapper'
) as HTMLDivElement

class MyActor extends UpdateObject {
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

class Game extends Engine {
  constructor() {
    super()
    this.app = new PIXI.Application({
      resizeTo: wrapper,
      backgroundColor: 0x1099bb
    })
    this.setScene(new MyScene())
  }
}

const game = new Game()
game.run(wrapper)
