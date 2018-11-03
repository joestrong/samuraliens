import * as Phaser from "phaser"
import ComplexObject from "./ComplexObject.ts"

export default class Player extends ComplexObject {
  public body: Phaser.Physics.Arcade.Body
  protected cursors: Phaser.Input.Keyboard.CursorKeys
  protected sprite: Phaser.GameObjects.Sprite

  public constructor(scene, x, y) {
    super(scene, x, y)

    this.setActive(true)
    this.cursors = scene.input.keyboard.createCursorKeys()

    this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, "dude")
    this.add(this.sprite)

    scene.anims.create({
      frameRate: 10,
      frames: scene.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      key: "left",
      repeat: -1,
    })
    scene.anims.create({
      frameRate: 20,
      frames: [{ key: "dude", frame: 4 }],
      key: "turn",
    })
    scene.anims.create({
      frameRate: 10,
      frames: scene.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      key: "right",
      repeat: -1,
    })

    this.setSize(32, 48)
    scene.physics.world.enableBody(this)
    this.body.setBounce(0.2, 0.2)
    this.body.setCollideWorldBounds(true)
  }

  public preUpdate() {
    if (this.cursors.left.isDown) {
      this.body.setVelocityX(-160)

      this.sprite.anims.play("left")
    } else if (this.cursors.right.isDown) {
      this.body.setVelocityX(160)

      this.sprite.anims.play("right")
    } else {
      this.body.setVelocityX(0)

      this.sprite.anims.play("turn")
    }

    if (this.cursors.up.isDown && this.body.touching.down) {
      this.body.setVelocityY(-330)
    }
  }
}
