import * as Phaser from 'phaser';
import BootScene from './scenes/Boot';
import BootMenu from './scenes/BootMenu';
import MushroomScene from './scenes/MushroomScene';

const config = {
  type: Phaser.AUTO,
  parent: 'content',
  width: 800,
  height: 600,
  scene: [
    BootScene,
    BootMenu,
    MushroomScene,
  ],
};

// eslint-disable-next-line
const game = new Phaser.Game(config)
