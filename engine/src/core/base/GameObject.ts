import * as PIXI from 'pixi.js'

abstract class GameObject extends PIXI.Container {
  private objectsToUpdate: GameObject[] = []
  private isActive = false

  behave() {
    if (!this.isActive) {
      this.start()
      this.isActive = true
    }
    this.update()

    const next = []
    for (const gameObject of this.objectsToUpdate) {
      if (gameObject._destroyed) {
        continue
      }
      gameObject.behave()
      next.push(gameObject)
    }
    this.objectsToUpdate = next
  }

  start(): void {}

  update(): void {}

  addChild(
    gameObject: GameObject | PIXI.DisplayObject
  ): GameObject | PIXI.DisplayObject {
    super.addChild(gameObject)
    if (gameObject instanceof GameObject) {
      this.objectsToUpdate.push(gameObject)
    }
    return gameObject
  }
}

export default GameObject
