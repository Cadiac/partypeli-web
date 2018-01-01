import * as Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload() {
    this.load.image('mushroom', './assets/mushroom.png');
  }

  create() {
    this.scene.start('MushroomScene');
  }
}

export default BootScene;
