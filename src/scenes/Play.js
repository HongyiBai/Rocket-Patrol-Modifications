class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }
    preload() {

        this.load.image('fist', './assets/fist.png');
        this.load.image('duck', './assets/duck.png');
        this.load.image('littleDuck', './assets/little-duck.png');
        this.load.image('bg', './assets/bg.png');
        this.load.spritesheet('explosion', './assets/boom.png', {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 6});
      }
    create() {

        this.starfield = this.add.tileSprite(0, 0, 1280, 960, 'bg').setOrigin(0, 0);

        // this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x1890FF, 0.8).setOrigin(0, 0);

        const header = this.add.graphics();
        header.fillStyle(0xffFFff, 0.5);
        header.fillRoundedRect(32, 39, game.config.width - borderUISize * 2, borderUISize * 2, 30);

        const score = this.add.graphics();
        score.fillStyle(0xF3B141, 1);
        score.fillRoundedRect(40, 50, 130, 40, 20);


        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);


        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'fist').setOrigin(0.5, 0.65);

        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'duck', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'duck', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'duck', 0, 10).setOrigin(0,0);

        this.littleDuck = new Spaceship(this, game.config.width, borderUISize*3 + borderPadding, 'littleDuck', 0, 50, 8).setOrigin(0,0);

        // keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        // keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.input.on('pointermove', function (pointer) {

          duckX = pointer.x;
          duckY = pointer.y;

        }, this)

    this.anims.create({
    key: 'explode',
    frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 14, first: 0}),
    frameRate: 100
    });


    this.p1Score = 0;
    let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    // backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);

    this.gameOver = false;

    scoreConfig.fixedWidth = 0;

    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        this.gameOver = true;
    }, null, this);


    }

    update() {
      this.background.tilePositionX += 4;
      
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            }

        this.starfield.tilePositionX -= 4;

        if (!this.gameOver) {
            this.p1Rocket.update();
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.littleDuck.update();
        }


        if(this.checkCollision(this.p1Rocket, this.ship03)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship03);
            }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship02);
            }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
        this.p1Rocket.reset();
        this.shipExplode(this.ship01);
            }
        if (this.checkCollision(this.p1Rocket, this.littleDuck)) {
          this.littleDuck.reset();
          this.shipExplode(this.littleDuck);
        }

        }
      checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width &&
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    shipExplode(ship) {

        ship.alpha = 0;

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
          ship.reset();
          ship.alpha = 1;
          boom.destroy();
        });
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
      }
}
