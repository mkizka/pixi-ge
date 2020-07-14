import {Scene}from'pixi-ge'
import Box from '../actors/Box'

export default class MainScene extends Scene {
  constructor() {
    super()
    for (let i = 0; i < 10; i++) {
      this.addObject(new Box(20*i, 20*i))
    }
  }
}
