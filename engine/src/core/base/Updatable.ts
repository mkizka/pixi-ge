abstract class Updatable {
  protected objects: Updatable[] = []
  protected started = false

  public behave() {
    if (!this.started) {
      this.start()
      this.started = true
    }
    this.update()
    for (const gameObject of this.objects) {
      gameObject.behave()
    }
  }

  start(): void {}

  update(): void {}

  addObject(updatable: Updatable): void {
    this.objects.push(updatable)
  }
}

export default Updatable
