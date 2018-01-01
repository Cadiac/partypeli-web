import * as Phaser from 'phaser';

class BootMenu extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootMenu',
    });
  }

  create() {
    const config = {
      x: 100,
      y: 100,
      text: 'Phaser 3 - Examples',
      style: {
        font: '64px Arial',
        fill: '#ff00ff',
        align: 'center',
        stroke: '#ffffff',
        strokeThickness: '4',
      },
    };
    this.make.text(config);

    this.input = [
      { key: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A), scene: 'MushroomScene' },
    ];
  }

  update() {
    this.input.forEach((input) => {
      if (input.key.isDown) {
        this.scene.start(input.scene);
      }
    });
  }
}

export default BootMenu;
