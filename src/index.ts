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

  game.init();
  const speed = 4;
  game.update((deltaTime) => {
    // console.log(deltaTime);
    if (game.isKeyPressed('w')) {
      square.nodeTransform.move('up', speed);
    }
    if (game.isKeyPressed('s')) {
      square.nodeTransform.move('down', speed);
    }
    if (game.isKeyPressed('a')) {
      square.nodeTransform.move('left', speed);
    }
    if (game.isKeyPressed('d')) {
      square.nodeTransform.move('right', speed);
    }
  });
};
