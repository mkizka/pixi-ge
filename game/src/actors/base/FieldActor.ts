import { Actor } from 'pixi-ge'

export default class FieldActor extends Actor {
  protected x = 0
  protected y = 0
  private isMoving = false

  constructor(x: number, y: number) {
    super()
    this.x = x
    this.y = y
  }

  behave() {
    super.behave()
    this.sprite.x = this.x * 48
    this.sprite.y = this.y * 48
  }
}
