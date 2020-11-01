import * as PIXI from 'pixi.js'
import { UpdateObject } from '@mkizka/pixi-ge'

class Stage extends UpdateObject<PIXI.Sprite> {
  constructor() {
    super()
    this.container = PIXI.Sprite.from(
      'https://pixijs.io/examples/examples/assets/bunny.png'
    )
  }

  update(): void {
    this.container.x += 1
    this.container.y += 1
  }
}

export default Stage
