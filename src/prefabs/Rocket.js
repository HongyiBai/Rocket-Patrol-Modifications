
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);


      scene.add.existing(this);
      this.isFiring = false;
      this.moveSpeed = 2;
      this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update(){
        if(!this.isFiring){
            const maxX = game.config.width - borderUISize - this.width;
            const minX = borderUISize + this.width
            if (this.x >= minX && this.x <= maxX && duckX){
                this.x = duckX;
                if (this.x < minX) {
                    this.x = minX;
                }
                if (this.x > maxX) {
                    this.x = maxX;
                }
            }
        }
        if(game.input.mousePointer.isDown){
            this.isFiring = true;
            this.sfxRocket.play();
        }
        if(this.isFiring && this.y >=borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        }
        if(this.y <= borderUISize * 3 + borderPadding){
            this.reset();
        }
    }
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding;
    }
  }
