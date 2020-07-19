# pixi-ge
Pixi.jsのゲームエンジンっぽいもの

## インストール
まだ

## サンプル
```ts
import * as PIXI from 'pixi.js'
import { Game, Scene, SceneManager, Actor, Fade } from 'pixi-ge'

PIXI.utils.skipHello()

const app = new PIXI.Application({
  width: 400,
  height: 400,
  backgroundColor: 0x1099bb
})

class Bunny extends Actor {
  public start() {
    const url = 'https://pixijs.io/examples/examples/assets/bunny.png'
    this.sprite.texture = PIXI.Sprite.from(url).texture
    this.sprite.x = app.screen.width / 2
    this.sprite.y = app.screen.height / 2
    this.sprite.anchor.set(0.5)
  }

  public update() {
    this.sprite.rotation -= 0.1
  }
}

class SampleScene1 extends Scene {
  constructor() {
    super()
    const bunny = new Bunny()
    bunny.sprite.interactive=true
    bunny.sprite.buttonMode=true
    bunny.sprite.on('pointerdown', () => {
      SceneManager.loadScene(new SampleScene2())
    })
    this.addObject(bunny)
  }
}

class SampleScene2 extends Scene {
  public readonly transitionIn = new Fade({
    from: 1.0,
    to: 0.1,
    progress: -0.01
  })
  public readonly transitionOut = new Fade({
    from: 0.1,
    to: 1.0,
    progress: 0.01
  })
  constructor() {
    super()
    const bunny = new Bunny()
    bunny.sprite.interactive=true
    bunny.sprite.buttonMode=true
    bunny.sprite.on('pointerdown', () => {
      SceneManager.loadScene(new SampleScene1())
    })
    this.addObject(bunny)
  }
}

const game = new Game(app)
game.start()
SceneManager.loadScene(new SampleScene1())

```
