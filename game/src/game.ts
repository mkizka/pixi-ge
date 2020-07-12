import * as PIXI from 'pixi.js'
import { Game } from 'pixi-ge'
import MainScene from './scenes/MainScene'

const app = new PIXI.Application({
  width: 400,
  height: 400,
  backgroundColor: 0x1099bb
})
const game = new Game(app)
game.start()
game.loadScene(new MainScene())
