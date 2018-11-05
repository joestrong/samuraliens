import * as Phaser from "phaser"
import ComplexObject from "./ComplexObject.ts"
import Enemy from "./Enemy.ts"
import Sprite = Phaser.GameObjects.Sprite
import STATIC_BODY = Phaser.Physics.Arcade.STATIC_BODY
import DYNAMIC_BODY = Phaser.Physics.Arcade.DYNAMIC_BODY
import Zone = Phaser.GameObjects.Zone
import GameObject = Phaser.GameObjects.GameObject

export default class Player extends ComplexObject {
  public body: Phaser.Physics.Arcade.Body
  public attackZones: Phaser.Physics.Arcade.Group
  protected cursors: Phaser.Input.Keyboard.CursorKeys
  protected sprite: Phaser.GameObjects.Sprite
  protected isAttacking: boolean = false

  public constructor(scene, x, y) {
    super(scene, x, y)

    this.setActive(true)
    this.cursors = scene.input.keyboard.createCursorKeys()
    this.attackZones = new Phaser.Physics.Arcade.Group(scene.physics.world, scene)
    this.attackZones.defaults.setAllowGravity = false

    this.sprite = scene.add.sprite(0, 0, "dude")
    this.sprite.on("animationcomplete", this.onAnimationComplete, this)
    this.add(this.sprite)

    const attackZone = new Zone(scene, 26, 0, 20, 48)
    this.attackZones.add(attackZone)
    this.add(attackZone)

    this.setSize(32, 48)
    scene.physics.world.enableBody(this)
    this.body.setBounce(0.2, 0.2)
    this.body.setCollideWorldBounds(true)
  }

  public preUpdate(): void {
    if (this.cursors.space.isDown && !this.isAttacking) {
      this.sprite.anims.play("attack", true)
      this.body.setVelocityX(0)
      this.isAttacking = true
    }

    if (!this.isAttacking) {
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(-160)
        this.sprite.anims.play("left", true)
      } else if (this.cursors.right.isDown) {
        this.body.setVelocityX(160)
        this.sprite.anims.play("right", true)
      } else {
        this.body.setVelocityX(0)
        this.sprite.anims.play("turn", true)
      }

      if (this.cursors.up.isDown && this.body.touching.down) {
        this.body.setVelocityY(-330)
      }
    }
  }

  public onAttackZoneOverlap(enemy: Enemy, attackZone: Zone): void {
    if (this.isAttacking && enemy.isHit() === false) {
      enemy.hit()
    }
  }

  protected onAnimationComplete(animation, frame): void {
    if (animation.key === "attack") {
      this.isAttacking = false
    }
  }
}
