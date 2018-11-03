import * as Phaser from "phaser"
import Player from "../Objects/Player.ts"

export default class Title extends Phaser.Scene {
  protected player: Player

  public preload() {
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 })
  }

  public create() {
    this.player = new Player(this, 100, 450)
    this.add.existing(this.player)
  }
}
