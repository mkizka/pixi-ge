import GameObject from '../../core/base/GameObject'
import Scene from '../../core/Scene'

/**
 * 即座にシーン遷移させるトランジション
 */
abstract class Transition extends GameObject {
  protected scene: Scene
  protected finished: boolean = false
  public onFinished: () => void = () => {}

  constructor(scene: Scene) {
    super()
    this.scene = scene
  }

  public get isFinished() {
    return this.finished
  }

  public behave(): void {
    super.behave()
    if (this.finished) {
      this.onFinished()
      this.destroy()
    }
  }
}

export default Transition
