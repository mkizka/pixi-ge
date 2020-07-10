import * as PIXI from 'pixi.js'
import Updatable from './base/Updatable'

abstract class Actor extends Updatable {
  /**
   * PIXI.Spriteインスタンス
   */
  public readonly sprite = new PIXI.Sprite()

  addObject(actor: Actor) {
    super.addObject(actor)
    this.sprite.addChild(actor.sprite)
  }
}

export default Actor
