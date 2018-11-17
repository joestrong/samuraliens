import * as Phaser from "phaser"
import ComplexObject from "./ComplexObject.ts"
import Enemy from "./Enemy.ts"
import Zone = Phaser.GameObjects.Zone

export default class Player extends ComplexObject {
  public body: Phaser.Physics.Arcade.Body
  public attackZones: Phaser.Physics.Arcade.Group
  protected cursors: Phaser.Input.Keyboard.CursorKeys
  protected sprite: Phaser.GameObjects.Sprite
  protected gi: Phaser.GameObjects.Sprite
  protected isAttacking: boolean = false
  protected moveSpeed: integer = 160
  protected jumpStrength: integer = 160
  protected direction: { LEFT: integer, RIGHT: integer} = {
      LEFT: 0,
      RIGHT: 1,
  }

  public constructor(scene, x, y) {
    super(scene, x, y)

    this.setActive(true)
    this.cursors = scene.input.keyboard.createCursorKeys()
    this.attackZones = new Phaser.Physics.Arcade.Group(scene.physics.world, scene)
    this.attackZones.defaults.setAllowGravity = false

    this.sprite = scene.add.sprite(0, 0, "samurai")
    this.sprite.on("animationcomplete", this.onAnimationComplete, this)
    this.add(this.sprite)

    this.gi = scene.add.sprite(0, 0, "gi")
    this.add(this.gi)

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
      this.gi.anims.play("gi_attack", true)
      this.body.setVelocityX(0)
      this.isAttacking = true
    }

    if (!this.isAttacking) {
      if (this.cursors.left.isDown) {
        this.body.setVelocityX(this.moveSpeed * -1)
        this.faceDirection(this.direction.LEFT)
        this.sprite.anims.play("run", true)
        this.gi.anims.play("gi_run", true)
      } else if (this.cursors.right.isDown) {
        this.body.setVelocityX(this.moveSpeed)
        this.faceDirection(this.direction.RIGHT)
        this.sprite.anims.play("run", true)
        this.gi.anims.play("gi_run", true)
      } else {
        this.body.setVelocityX(0)
        this.sprite.anims.play("stand", true)
        this.gi.anims.play("gi_stand", true)
      }

      if (this.cursors.up.isDown && this.body.touching.down) {
        this.body.setVelocityY(this.jumpStrength * -1)
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

  protected faceDirection(direction: integer) {
    if (direction === this.direction.LEFT) {
      this.sprite.setFlipX(true)
      this.gi.setFlipX(true)
      this.attackZones.getChildren().forEach((zone: Zone) => {
        zone.x = Math.abs(zone.x) * -1
      }, this)
    } else {
      this.sprite.setFlipX(false)
      this.gi.setFlipX(false)
      this.attackZones.getChildren().forEach((zone: Zone) => {
        zone.x = Math.abs(zone.x)
      }, this)
    }
  }
}
