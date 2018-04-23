/* globals __DEV__ */
import Phaser from 'phaser'

import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {
    console.log('Game.init()')
  }
  preload () {
    console.log('Game.preload()')
  }

  create () {
    console.log('Game.create()')

    this.background = this.game.add.sprite(0, 0, 'backyard')
    this.background.inputEnabled = true
    this.background.events.onInputDown.add(this.placeItem, this)

    this.pet = this.game.add.sprite(100, 400, 'pet', 3)
    this.pet.anchor.setTo(0.5)

    // spritesheet animations
    this.pet.animations.add('funnyfaces', [1, 2, 3, 2, 1], 7, false)

    // custom properties
    this.pet.customParams = {health: 100, fun: 100}

    // draggable pet
    this.pet.inputEnabled = true
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
    this.candy.customParams = {health: -10, fun: 10}
    this.candy.events.onInputDown.add(this.pickItem, this)

    this.toy.inputEnabled = true
    this.toy.customParams = {fun: 10}
    this.toy.events.onInputDown.add(this.pickItem, this)

    this.rotate.inputEnabled = true
    this.apple.customParams = {health: 20}
    this.rotate.events.onInputDown.add(this.rotatePet, this)

    this.buttons = [this.apple, this.candy, this.toy, this.rotate]

    // nothing is selected
    this.selectedItem = null

    // UI is not blocked at the start
    this.uiBlocked = false

    var style = {font: '20px Arial', fill: '#fff'}
    this.game.add.text(10, 20, 'Health:', style)
    this.game.add.text(140, 20, 'Fun:', style)

    this.healthText = this.game.add.text(80, 20, '', style)
    this.funText = this.game.add.text(185, 20, '', style)

    this.refreshStats()

    // decreast the health every 5 seconds
    this.statsDecreaser = this.game.time.events.loop(Phaser.Timer.SECOND * 5, this.reduceProperties, this)
  }

  pickItem (sprite, event) {
    if (!this.uiBlocked) {
      console.log('pick item')

      this.clearSelection()

      sprite.alpha = 0.4

      this.selectedItem = sprite
    }
  }

  rotatePet (sprite, event) {
    if (!this.uiBlocked) {
      console.log('rotating...')

      this.uiBlocked = true

      this.clearSelection()

      sprite.alpha = 0.4

      var petRotation = this.game.add.tween(this.pet)

      petRotation.to({angle: '+720'}, 1000)

      petRotation.onComplete.add(function () {
        this.uiBlocked = false
        sprite.alpha = 1

        this.pet.customParams.fun += 10
        // console.log(this.pet.customParams)
        this.refreshStats()
      }, this)

      petRotation.start()
    }
  }

  clearSelection () {
    this.buttons.forEach(function (element, index) {
      element.alpha = 1
    })

    this.selectedItem = null
  }

  placeItem (sprite, event) {
    if (this.selectedItem && !this.uiBlocked) {
      var x = event.position.x
      var y = event.position.y

      var newItem = this.game.add.sprite(x, y, this.selectedItem.key)
      centerGameObjects([newItem])
      newItem.customParams = this.selectedItem.customParams

      this.uiBlocked = true
      this.petMovement = this.game.add.tween(this.pet)
      this.petMovement.to({x: x, y: y}, 700)

      this.petMovement.onComplete.add(function () {
        newItem.destroy()

        this.pet.animations.play('funnyfaces')

        this.uiBlocked = false

        var stat
        for (stat in newItem.customParams) {
          if (newItem.customParams.hasOwnProperty(stat)) {
            // console.log(stat)
            this.pet.customParams[stat] += newItem.customParams[stat]
          }
        }

        this.refreshStats()
      }, this)

      this.petMovement.start()
    }
  }

  refreshStats () {
    this.healthText.text = this.pet.customParams.health
    this.funText.text = this.pet.customParams.fun
  }

  reduceProperties () {
    this.pet.customParams.health -= 10
    this.pet.customParams.fun -= 15
    this.refreshStats()
  }

  update () {
    if (this.pet.customParams.health <= 0 || this.pet.customParams.fun <= 0) {
      this.pet.frame = 4
      this.uiBlocked = true

      this.game.time.events.add(2000, this.gameOver, this)
    }
  }

  gameOver () {
    // this.game.state.restart()
    this.state.start('Splash', true, false, 'GAME OVER!')
  }

  render () {
    // console.log('Game.render()')
    if (__DEV__) {
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
