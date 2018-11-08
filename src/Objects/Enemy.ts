import * as Phaser from "phaser"
import ComplexObject from "./ComplexObject.ts"

export default class Player extends ComplexObject {
  public body: Phaser.Physics.Arcade.Body
  protected sprite: Phaser.GameObjects.Sprite
  protected beenHit: boolean = false

  public constructor(scene, x, y) {
    super(scene, x, y)

    this.sprite = scene.add.sprite(0, 0, "samurai")
    this.sprite.on("animationcomplete", this.onAnimationComplete, this)
    this.add(this.sprite)

    this.setSize(32, 48)
    scene.physics.world.enableBody(this)
    this.body.setBounce(0.2, 0.2)
    this.body.setCollideWorldBounds(true)
  }

  public isHit(): boolean {
    return this.beenHit
  }

  public hit(): void {
    this.beenHit = true
    this.body.setVelocityY(-330)
    this.sprite.anims.play("hit")
  }

  protected onAnimationComplete(animation, frame): void {
    if (animation.key === "hit") {
      this.beenHit = false
    }
  }
}
