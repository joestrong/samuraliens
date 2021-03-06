import * as Phaser from "phaser"
import Title from "./Scenes/Title.ts"

export default class Game {
  public game: Phaser.Game

  constructor() {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 300 },
          debug: true,
        },
      },
      scene: [
        Title,
      ],
    }
    this.game = new Phaser.Game(config)
  }
}
