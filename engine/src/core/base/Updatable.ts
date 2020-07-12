abstract class Updatable {
  protected objects: Updatable[] = []
  protected started = false

  public get isStarted(): boolean {
    return this.started
  }

  public behave(): void {
    if (!this.started) {
      this.start()
      this.started = true
    }
    this.update()
    for (const gameObject of this.objects) {
      gameObject.behave()
    }
  }

  protected start(): void {}

  protected update(): void {}

  public addObject(updatable: Updatable): void {
    this.objects.push(updatable)
  }
}

export default Updatable
