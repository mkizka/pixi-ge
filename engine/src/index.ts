import Game from './core/Game'
import Actor from './core/Actor'
import Fade from './transitions/Fade'
import Immediate from './transitions/Immediate'
import Scene from './core/Scene'
import SceneManager from './managers/SceneManager'
import Transition from './transitions/base/Transition'
import Updatable from './core/base/Updatable'
import * as PIXI from 'pixi.js'
PIXI.utils.skipHello()
export {
  Game,
  Scene,
  SceneManager,
  Actor,
  Updatable,
  Transition,
  Fade,
  Immediate
}
