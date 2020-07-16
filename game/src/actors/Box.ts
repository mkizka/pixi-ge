import * as PIXI from 'pixi.js'
import { Actor } from 'pixi-ge'
import Input from '../system/Input'

export default class Box extends Actor {
  private data: PIXI.InteractionData | null = null
  private dragging = false

  constructor(x: number, y: number) {
    super()
    const url = 'https://pixijs.io/examples/examples/assets/bunny.png'
    this.sprite.texture = PIXI.Sprite.from(url).texture
    this.sprite.width = 50
    this.sprite.height = 50
    this.sprite.x = x
    this.sprite.y = y
    this.sprite.anchor.set(0.5)
    this.sprite.interactive = true
    this.sprite.buttonMode = true
    this.sprite
      .on('pointerdown', (e:PIXI.InteractionEvent) => this.onDragStart(e))
      .on('pointerup', () => this.onDragEnd())
      .on('pointerupoutside', () => this.onDragEnd())
      .on('pointermove', () => this.onDragMove())
  }

  public update() {
    const speed = 2
    switch (Input.code) {
      case 'up':
        this.sprite.y -= speed
        break
      case 'left':
        this.sprite.x -= speed
        break
      case 'right':
        this.sprite.x += speed
        break
      case 'down':
        this.sprite.y += speed
        break
    }
  }

  private onDragStart(event: PIXI.InteractionEvent) {
    this.data = event.data
    this.sprite.alpha = 0.5
    this.sprite.scale.x *= 6/5
    this.sprite.scale.y *= 6/5
    this.dragging = true
  }

  private onDragEnd() {
    this.data = null
    this.sprite.alpha = 1
    this.sprite.scale.x *= 5/6
    this.sprite.scale.y *= 5/6
    this.dragging = false
  }

  private onDragMove() {
    if (this.dragging && this.data) {
      const newPosition = this.data.getLocalPosition(this.sprite.parent)
      this.sprite.x = newPosition.x
      this.sprite.y = newPosition.y
    }
  }
}
