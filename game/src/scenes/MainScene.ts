import {Scene}from'pixi-ge'
import Card from '../actors/Card'

export default class MainScene extends Scene {
  constructor() {
    super()
    this.addObject(new Card(200, 200))
  }
}
