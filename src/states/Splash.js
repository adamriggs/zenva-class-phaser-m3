import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    console.log('Splash.init()')
  }

  preload () {
    console.log('Splash.preload()')

  }

  create () {
    console.log('Splash.create()')
    this.state.start('Preload')
  }
}
