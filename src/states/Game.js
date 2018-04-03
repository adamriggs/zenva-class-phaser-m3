/* globals __DEV__ */
import Phaser from 'phaser'

import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init() { 
    console.log('Game.init()')
  }
  preload() {
    console.log('Game.preload()')
  }

  create() {
    console.log('Game.create()')


    this.background = this.game.add.sprite(0, 0, 'backyard')

    this.pet = this.game.add.sprite(100, 400, 'pet')
    this.pet.anchor.setTo(0.5);

    //custom properties
    this.pet.customParams = {health: 100, fun: 100}

    //draggable pet
    this.pet.inputEnabled = true;
    this.pet.input.enableDrag()

    this.apple = this.game.add.sprite(72, 570, 'apple')
    this.candy = this.game.add.sprite(144, 570, 'candy')
    this.toy = this.game.add.sprite(216, 570, 'toy')
    this.rotate = this.game.add.sprite(288, 570, 'rotate')

    centerGameObjects([this.apple, this.candy, this.toy, this.rotate])

    this.apple.inputEnabled = true
    this.apple.customParams = {health: 20}
    this.apple.events.onInputDown.add(this.pickItem, this)

    this.candy.inputEnabled = true
    this.apple.customParams = {health: -10, fun: 10}
    this.candy.events.onInputDown.add(this.pickItem, this)

    this.toy.inputEnabled = true
    this.apple.customParams = {fun: 10}
    this.toy.events.onInputDown.add(this.pickItem, this)

    this.rotate.inputEnabled = true
    this.apple.customParams = {health: 20}
    this.rotate.events.onInputDown.add(this.rotatePet, this)

    this.buttons = [this.apple, this.candy, this.toy, this.rotate]

    //nothing is selected
    this.selectedItem = null
  }

  pickItem(sprite, event) {
    console.log('pick item')
  }

  rotatePet(sprite, event) {
    console.log('rotating...')
  }

  render() {
    //console.log('Game.render()')
    if (__DEV__) {
      //this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
