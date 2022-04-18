class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    preload() {

        this.load.audio('sfx_select', './assets/start.wav');
        this.load.audio('sfx_explosion', './assets/boom.wav');
        this.load.audio('sfx_rocket', './assets/launch.wav');
        this.load.image('startBg', './assets/start-bg.png');
      }
    create() {
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
              top: 5,
              bottom: 5,
            },
            fixedWidth: 0
          }

        this.add.tileSprite(0, 0, 640, 480, 'startBg').setOrigin(0, 0).setScale(1, game.config.height / 382);

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL(Mods)', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 , 'Use mouse to move and click mouse to fire', { ...menuConfig, fontSize: '24px' }).setOrigin(0.5);
        menuConfig.backgroundColor = '#80FF00';
        menuConfig.color = '#000';
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'Press <- for Novice or -> Expert', menuConfig).setOrigin(0.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
      }

      update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {

          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {

          game.settings = {
            spaceshipSpeed: 6,
            gameTimer: 45000
          }
          this.sound.play('sfx_select');
          this.scene.start('playScene');
        }
      }
}
