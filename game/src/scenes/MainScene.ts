import { Scene } from 'pixi-ge'
import Input from '../system/Input'

export default class MainScene extends Scene {
  constructor() {
    super()
    this.addObject(new Input())
  }
}
