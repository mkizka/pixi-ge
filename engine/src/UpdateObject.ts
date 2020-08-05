import * as PIXI from 'pixi.js'

class UpdateObject<T extends PIXI.Container = PIXI.Container> {
  public container: T
  protected objects: UpdateObject<T>[] = []
  protected started = false
  protected destroyed = false

  public get isStarted(): boolean {
    return this.started
  }

  public get isDestroyed(): boolean {
    return this.destroyed
  }

  constructor(container: T) {
    this.container = container
  }

  public behave(): void {
    if (!this.started) {
      this.start()
      this.started = true
    }
    this.update()
    const next: UpdateObject<T>[] = []
    for (const gameObject of this.objects) {
      if (gameObject.destroyed) continue
      gameObject.behave()
      next.push(gameObject)
    }
    this.objects = next
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected start(): void {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  protected update(): void {}

  public addChild(child: UpdateObject<T>): typeof child {
    this.container.addChild(child.container)
    if (!this.objects.includes(child)) {
      this.objects.push(child)
    }
    return child
  }

  /**
   * 子要素と合わせてbehaveで呼び出されなくする
   */
  public destroy(): void {
    this.container.destroy()
    this.destroyed = true
    this.objects.forEach(obj => obj.destroy())
  }
}

export default UpdateObject
