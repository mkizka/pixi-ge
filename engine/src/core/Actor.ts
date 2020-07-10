import * as PIXI from 'pixi.js'
import Updatable from './base/Updatable'

abstract class Actor extends Updatable {
  /**
   * PIXI.Spriteインスタンス
   */
  public readonly sprite = new PIXI.Sprite()
}

export default Actor
