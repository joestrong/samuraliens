import * as Phaser from "phaser"

export default class Title extends Phaser.Scene {
  protected cursors: Phaser.Input.Keyboard.CursorKeys
  protected player: Phaser.Physics.Arcade.Sprite

  public preload() {
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 })
  }

  public create() {
    this.cursors = this.input.keyboard.createCursorKeys()
    this.player = this.physics.add.sprite(100, 450, "dude")

    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      key: "left",
      repeat: -1,
    })

    this.anims.create({
      frameRate: 20,
      frames: [{ key: "dude", frame: 4 }],
      key: "turn",
    })

    this.anims.create({
      frameRate: 10,
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      key: "right",
      repeat: -1,
    })
  }

  public update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)

      this.player.anims.play("left", true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)

      this.player.anims.play("right", true)
    } else {
      this.player.setVelocityX(0)

      this.player.anims.play("turn")
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }
}
