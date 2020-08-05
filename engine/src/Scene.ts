import * as PIXI from 'pixi.js'
import UpdateObject from './UpdateObject'

class Scene extends UpdateObject {
  constructor() {
    super(new PIXI.Container())
  }
}

export default Scene
