abstract class GameObject {
  private destroyed = false
  get isDestroyed() {
    return this.destroyed
  }

  start(): void {}
  update(): void {}
}

export default GameObject
