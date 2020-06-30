import { Application } from 'pixi.js'
import { GameManager, Scene } from './engine'

GameManager.startApp(
  new Application({
    width: 400,
    height: 400,
    backgroundColor: 0x000000
  })
)

class ExampleScene extends Scene {}

GameManager.loadScene(new ExampleScene())
