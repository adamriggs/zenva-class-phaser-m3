import Phaser from 'phaser'
// import WebFont from 'webfontloader'
// import config from '../config'

export default class extends Phaser.State {
  init () {
    console.log('Boot.init()')
    this.stage.backgroundColor = '#000'

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL
    this.scale.pageAlignHorizontally = true
    this.scale.pageAlignVertically = true

    // with Cordova with need to wait that the device is ready so we will call the Boot state in another file
    if (!window.cordova) {
      this.state.start('Boot')
    }
  }

  preload () {
    console.log('Boot.preload()')
    this.load.image('preloadBar', 'assets/images/bar.png')
    this.load.image('logo', 'assets/images/logo.png')
  }

  render () {
    console.log('Boot.render()')
  }

  create () {
    console.log('Boot.create()')
    this.game.stage.backgroundColor = '#fff'
    this.state.start('Preload')
  }
}
