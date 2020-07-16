import * as PIXI from 'pixi.js'
import FieldActor from './base/FieldActor'

export default class Box extends FieldActor {
  constructor(x: number, y: number) {
    super(x, y)
    const url = 'https://pixijs.io/examples/examples/assets/bunny.png'
    this.sprite.texture = PIXI.Sprite.from(url).texture
    this.sprite.width=5
    this.sprite.height=5
  }
}
