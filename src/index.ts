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
    bgColor: 'red'
  });

  setInterval(() => {
    const newPosition = {
      x: Math.floor(Math.random() * 800),
      y: Math.floor(Math.random() * 600)
    };
    square.update({
      size: square.props.size,
      position: newPosition
    });
    console.log(newPosition);
  }, 1000);
};
