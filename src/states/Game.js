/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'

export default class extends Phaser.State {
  init() { }
  preload() { }

  create() {
    // const bannerText = 'Phaser + ES6 + Webpack'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText, {
    //   font: '40px Bangers',
    //   fill: '#77BFA3',
    //   smoothed: false
    // })

    // banner.padding.set(10, 16)
    // banner.anchor.setTo(0.5)

    // this.mushroom = new Mushroom({
    //   game: this.game,
    //   x: this.world.centerX,
    //   y: this.world.centerY,
    //   asset: 'mushroom'
    // })

    // this.game.add.existing(this.mushroom)

    this.background = this.game.add.sprite(0, 0, 'backyard');

    this.pet = this.game.add.sprite(100, 400, 'pet');
    this.pet.anchor.setTo(0.5);

    //custom properties
    this.pet.customParams = {health: 100, fun: 100};

    this.apple = this.game.add.sprite(72, 570, 'apple');
    this.candy = this.game.add.sprite(144, 570, 'candy');
    this.toy = this.game.add.sprite(216, 570, 'toy');
    this.rotate = this.game.add.sprite(288, 570, 'rotate');
  }

  render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
