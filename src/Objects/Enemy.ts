import * as Phaser from "phaser"
import ComplexObject from "./ComplexObject.ts"
import Sprite = Phaser.GameObjects.Sprite

export default class Player extends ComplexObject {
  public body: Phaser.Physics.Arcade.Body
  protected sprite: Phaser.GameObjects.Sprite

  public constructor(scene, x, y) {
    super(scene, x, y)

    this.sprite = new Sprite(scene, 0, 0, "dude")
    this.add(this.sprite)

    this.setSize(32, 48)
    scene.physics.world.enableBody(this)
    this.body.setBounce(0.2, 0.2)
    this.body.setCollideWorldBounds(true)
  }
}
