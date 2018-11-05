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

    this.anims.create({
      frameRate: 20,
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      key: "left",
      repeat: -1,
    })
    this.anims.create({
      frameRate: 2,
      frames: [{ key: "dude", frame: 4 }],
      key: "turn",
    })
    this.anims.create({
      frameRate: 20,
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      key: "right",
      repeat: -1,
    })
    this.anims.create({
      frameRate: 20,
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      key: "attack",
    })
    this.anims.create({
      frameRate: 20,
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 8 }),
      key: "hit",
    })

    this.player = new Player(this, 152, 292)
    this.add.existing(this.player)

    const platforms = this.physics.add.staticGroup()
    const zone = this.add.zone(400, 340, 800, 30)
    platforms.add(zone)

    const enemies = this.add.group()
    const enemy = new Enemy(this, 600, 292)
    enemies.add(enemy)
    this.add.existing(enemy)

    this.physics.add.collider(this.player, platforms)
    this.physics.add.collider(enemies, platforms)
    this.physics.add.overlap(this.player.attackZones, enemies, this.player.onAttackZoneOverlap, null, this.player)
  }
}
