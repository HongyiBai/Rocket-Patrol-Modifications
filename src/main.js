let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
  let game = new Phaser.Game(config);

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT, duckX, duckY;

//I chose these three following :Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//Implement mouse control for player movement and mouse click to fire (20)
//Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (6
//Name: Hongyi Bai 
//Project title: My-Porject-Patrol Modifaction 
//date:4/17/2022  
// I took 13 hours to finish this project.
// I make it to use mouse to control and use mouse to fire.
// I make a new type of enemy that mover faster and smaller for more points.
// I redesign the game as a magic hunting ducks game that I change all the soundS. I also change the menu UI, the scores Ui, the background, the enenmies, the rocket, and the explosion animation.