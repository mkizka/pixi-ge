import { Game } from 'pixi-ge'

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const wrapper = document.body.querySelector<HTMLDivElement>('#wrapper')!

class MyGame extends Game {
  constructor() {
    super({
      resizeTo: wrapper,
      backgroundColor: 0x1099bb
    })
  }
}

const game = new MyGame()
game.run(wrapper)
