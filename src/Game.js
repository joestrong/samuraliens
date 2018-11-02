import Phaser from 'phaser'
import Title from './Scenes/Title'

export default class Game {
  constructor () {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      scene: [
        Title
      ]
    }
    this.game = new Phaser.Game(config) // eslint-disable-line no-new
  }
}
