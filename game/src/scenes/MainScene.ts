import { Scene } from 'pixi-ge'
import Input from '../system/Input'
import Box from '../actors/Box'

export default class MainScene extends Scene {
  constructor() {
    super()
    this.addObject(new Input())
    this.addObject(new Box(50, 50))
  }
}
