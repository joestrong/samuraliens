import * as Phaser from "phaser"
import Enemy from "../Objects/Enemy.ts"
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

    const enemies = this.add.group()
    const enemy = new Enemy(this, 300, 450)
    enemies.add(enemy)
    this.add.existing(enemy)

    this.physics.add.collider(this.player, platforms)
    this.physics.add.collider(enemies, platforms)
    this.physics.add.collider(this.player.attackZones, enemies)
  }
}
