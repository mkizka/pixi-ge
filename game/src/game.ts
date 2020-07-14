import * as PIXI from 'pixi.js'
import { Game } from 'pixi-ge'
import MainScene from './scenes/MainScene'

const wrapper = document.querySelector<HTMLDivElement>('#wrapper')!

const app = new PIXI.Application({
  resizeTo: wrapper,
  backgroundColor: 0x1099bb
})

const game = new Game(app)
game.start(wrapper!)
game.loadScene(new MainScene())
