import * as PIXI from 'pixi.js'
import { Game, SceneManager } from 'pixi-ge'
import MainScene from './scenes/MainScene'

const wrapper = document.querySelector<HTMLDivElement>('#wrapper')!

const app = new PIXI.Application({
  resizeTo: wrapper,
  backgroundColor: 0x1099bb
})

const game = new Game(app)
game.start(wrapper!)
SceneManager.loadScene(new MainScene())
