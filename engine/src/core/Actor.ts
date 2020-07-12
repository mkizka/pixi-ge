import * as PIXI from 'pixi.js'
import Updatable from './base/Updatable'

export default class Actor extends Updatable {
  /**
   * PIXI.Spriteインスタンス
   */
  public readonly sprite = new PIXI.Sprite()

  public addObject(actor: Actor) {
    super.addObject(actor)
    this.sprite.addChild(actor.sprite)
  }
}
