import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    // this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    // this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    // centerGameObjects([this.loaderBg, this.loaderBar])

    // this.load.setPreloadSprite(this.loaderBar)
    // //
    // // load your assets
    // //
    // this.load.image('mushroom', 'assets/images/mushroom2.png')

    this.load.image('backyard', 'assets/images/backyard.png');    
    this.load.image('apple', 'assets/images/apple.png');    
    this.load.image('candy', 'assets/images/candy.png');    
    this.load.image('rotate', 'assets/images/rotate.png');    
    this.load.image('toy', 'assets/images/rubber_duck.png');    
    this.load.image('arrow', 'assets/images/arrow.png');   
    this.load.spritesheet('pet', 'assets/images/pet.png', 97, 83, 5, 1, 1); 
  }

  create () {

    this.background = this.game.add.sprite(0, 0, 'backyard');

    this.pet = this.game.add.sprite(100, 400, 'pet');
    this.pet.anchor.setTo(0.5);

    //custom properties
    this.pet.customParams = {health: 100, fun: 100};

    this.apple = this.game.add.sprite(72, 570, 'apple');
    this.candy = this.game.add.sprite(144, 570, 'candy');
    this.toy = this.game.add.sprite(216, 570, 'toy');
    this.rotate = this.game.add.sprite(288, 570, 'rotate');

    this.state.start('Game')
  }
}
