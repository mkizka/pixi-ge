import GameManager from './core/GameManager'
import GameObject from './core/GameObject'
import Fade from './transitions/Fade'
import Immediate from './transitions/Immediate'
import Scene from './core/Scene'

const transitions = {
  Fade,
  Immediate
}

export { GameManager, Scene, GameObject, transitions }
