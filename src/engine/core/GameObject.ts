abstract class GameObject {
  private destroyed = false
  get isDestroyed() {
    return this.destroyed
  }

  start(): void {}
  update(delta: number): void {}
}

export default GameObject
