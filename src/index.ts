import Node, { NodeProps } from './GameEngine/node.js';
import GameWindow from './GameEngine/window.js';

window.onload = () => {
  const game = GameWindow({
    gameContainer: 'game',
    size: {
      w: 800,
      h: 600
    }
  });

  const square = game.addElement({
    size: {
      h: 50,
      w: 50
    },
    bgColor: 'red',
    position: {
      x: 400,
      y: 400
    }
  });

  setInterval(() => {
    //randomly move the square
    const direction = Math.floor(Math.random() * 4);
    const speed = 50;
    switch (direction) {
      case 0:
        square.nodeTransform.move('up', speed);
        break;
      case 1:
        square.nodeTransform.move('down', speed);
        break;
      case 2:
        square.nodeTransform.move('left', speed);
        break;
      case 3:
        square.nodeTransform.move('right', speed);
        break;
    }
  }, 1000);
};
