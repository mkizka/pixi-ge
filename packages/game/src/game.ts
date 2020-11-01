import * as PIXI from 'pixi.js'
import { Engine, Scene } from '@mkizka/pixi-ge'
import Stage from './actors/Stage'

const wrapper = document.body.querySelector<HTMLDivElement>(
  '#wrapper'
) as HTMLDivElement

class MyScene extends Scene {
  start() {
    this.addChild(new Stage())
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
