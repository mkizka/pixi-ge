import { Game } from 'pixi-ge'
import MainScene from './scenes/MainScene'

const wrapper = document.querySelector<HTMLDivElement>('#wrapper')!

class MyGame extends Game {
  protected _scene = new MainScene()

  constructor() {
    super({
      resizeTo: wrapper,
      backgroundColor: 0x1099bb
    })
  }

}
const game= new MyGame()
game.run(wrapper!)
