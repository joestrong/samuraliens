import * as Phaser from 'phaser'
import Title from './Scenes/Title.ts'

export default class Game {
  game: Phaser.Game

  constructor () {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: [
        Title
      ]
    }
    this.game = new Phaser.Game(config) // eslint-disable-line no-new
  }
}
