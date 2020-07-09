PlayerBullet = function (game, x, y, bulletType) {
    this.SetType();
    Phaser.Sprite.call(this, game, x, y, "bullet_" + bulletType);
    this.anchor.setTo(0.5, 0.5);
    this.scale.setTo(0.3, 0.3);
    this.bulletType = bulletType;
    //console.log("el tipo: " + bulletType )

    this.checkWorldBounds = true;
    this.outOfBoundsKill = true;

    this.events.onOutOfBounds.add(function () {
        this.kill();
    }, this);
}

PlayerBullet.prototype = Object.create(Phaser.Sprite.prototype);

PlayerBullet.prototype.constructor = PlayerBullet;

PlayerBullet.prototype.SetType = function () {
    this.key = "bullet_" + this.bulletType;
}

PlayerBullet.prototype.update = function () {
    if (this.position.x < 0 && this.position.x > 800) {
        this.kill();
    }
}

PlayerBullet.prototype.reset = function (x, y, bulletType) {
    this.bulletType = bulletType;
    this.SetType();
    this.loadTexture(this.key);
    Phaser.Sprite.prototype.reset.call(this, x, y, this.key);
}

