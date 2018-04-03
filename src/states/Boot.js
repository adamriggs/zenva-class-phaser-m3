import Phaser from 'phaser'
import WebFont from 'webfontloader'
import config from '../config'

export default class extends Phaser.State {
  init() {
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

  preload() {
    console.log('Boot.preload()')

  }

  render() {
    console.log('Boot.render()')

  }

  fontsLoaded() {
    this.fontsReady = true
  }

  create () {
    console.log('Boot.create()')
    this.state.start('Splash')
  }
}
