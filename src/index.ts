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

  square.nodeInput.onKeyDown((e) => {
    const key = e.key;
    const speed = 50;
    switch (key) {
      case 'w':
        square.nodeTransform.move('up', speed);
        break;
      case 's':
        square.nodeTransform.move('down', speed);
        break;
      case 'a':
        square.nodeTransform.move('left', speed);
        break;
      case 'd':
        square.nodeTransform.move('right', speed);
        break;
    }
  });
};
