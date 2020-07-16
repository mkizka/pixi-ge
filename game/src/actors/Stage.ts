import * as PIXI from 'pixi.js'
import { Actor } from 'pixi-ge'
import Box from './Box'

export default class Stage extends Actor {
  private sizeX = 10
  private sizeY = 7

  constructor() {
    super()
    const url = 'https://pixijs.io/examples/examples/assets/bunny.png'
    this.sprite.texture = PIXI.Sprite.from(url).texture
    this.sprite.width = 48 * this.sizeX
    this.sprite.height = 48 * this.sizeY
    const box = new Box(0, 0)
    this.sprite.addChild(box.sprite)
  }
}
