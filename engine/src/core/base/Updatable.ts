abstract class Updatable {
  protected parent: Updatable | null = null
  protected objects: Updatable[] = []
  protected started = false
  protected destroyed = false

  public get isStarted(): boolean {
    return this.started
  }

  public get isDestroyed(): boolean {
    return this.destroyed
  }

  public behave(): void {
    if (!this.started) {
      this.start()
      this.started = true
    }
    this.update()
    const next: Updatable[] = []
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

  /**
   * behaveで同時に呼び出される子要素を登録する
   * @param updatable
   */
  public addObject(updatable: Updatable): void {
    updatable.parent = this
    this.objects.push(updatable)
  }

  /**
   * behaveで呼び出されなくする
   * 継承クラスで同時に停止したい要素があれば上書きす
   */
  public destroy(): void {
    this.destroyed = true
  }
}

export default Updatable
