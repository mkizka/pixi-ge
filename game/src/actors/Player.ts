import * as PIXI from 'pixi.js'
import FieldActor from './base/FieldActor'
import Input from '../system/Input'

export default class Player extends FieldActor {
  constructor(x: number, y: number) {
    super(x, y)
    const url = 'https://pixijs.io/examples/examples/assets/bunny.png'
    this.sprite.texture = PIXI.Sprite.from(url).texture
    this.sprite.width = 48
    this.sprite.height = 48
  }

  update() {
    switch (Input.code) {
      case 'up':
        this.y--
        break
      case 'left':
        this.x--
        break
      case 'right':
        this.x++
        break
      case 'down':
        this.y++
        break
    }
    if (this.x < 0) {
      this.x = 0
    }
    if (this.y < 0) {
      this.y = 0
    }
  }
}

