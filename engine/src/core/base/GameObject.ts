abstract class GameObject {
  private objectsToUpdate: GameObject[] = []
  private started = false
  private destroyed = false

  public get isActive(): boolean {
    return this.started && !this.isDestroyed
  }

  public get isDestroyed(): boolean {
    return this.destroyed
  }

  public destroy(): void {
    this.destroyed = true
  }

  public behave() {
    if (!this.started) {
      this.start()
      this.started = true
    }
    this.update()

    const next = []
    for (const gameObject of this.objectsToUpdate) {
      if (gameObject.destroyed) {
        continue
      }
      gameObject.behave()
      next.push(gameObject)
    }
    this.objectsToUpdate = next
  }

  start(): void {}

  update(): void {}

  addObject(gameObject: GameObject): void {
    this.objectsToUpdate.push(gameObject)
  }
}

export default GameObject
