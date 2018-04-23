import Phaser from 'phaser'
// import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init (message) {
    console.log('Splash.init()')
    this.message = message
  }

  preload () {
    console.log('Splash.preload()')
  }

  create () {
    console.log('Splash.create()')
    var background = this.game.add.sprite(0, 0, 'backyard')
    background.inputEnabled = true

    background.events.onInputDown.add(function () {
      this.state.start('Game')
    }, this)

    var style = {font: '35px Arial', fill: '#fff'}
    this.game.add.text(30, this.game.world.centerY + 200, 'TOUCH TO START', style)

    if (this.message) {
      this.game.add.text(60, this.game.world.centerY - 200, this.message, style)
    }
  }
}
