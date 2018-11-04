import * as Phaser from "phaser"
import Player from "../Objects/Player.ts"

export default class Title extends Phaser.Scene {
  protected player: Player

  public preload() {
    this.load.image("background", "assets/background.png")
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 })
  }

  public create() {
    this.add.image(400, 300, "background")

    this.player = new Player(this, 100, 450)
    this.add.existing(this.player)

    const platforms = this.physics.add.staticGroup()
    const zone = this.add.zone(400, 500, 800, 30)
    platforms.add(zone)
    this.physics.add.collider(this.player, platforms)
  }
}
