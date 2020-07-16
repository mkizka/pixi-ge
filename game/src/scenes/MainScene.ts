import { Scene } from 'pixi-ge'
import Input from '../system/Input'
import Stage from '../actors/Stage'
import Player from '../actors/Player'


export default class MainScene extends Scene {
  constructor() {
    super()
    this.addObject(new Input())
    this.addObject(new Stage())
  }
}
