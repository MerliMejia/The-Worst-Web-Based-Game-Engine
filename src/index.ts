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
      h: 200,
      w: 128
    },
    bgColor: 'transparent',
    position: {
      x: 400,
      y: 400
    }
  });
  const square2 = game.addElement({
    size: {
      h: 200,
      w: 128
    },
    bgColor: 'transparent',
    position: {
      x: 0,
      y: 0
    }
  });
  const square3 = game.addElement({
    size: {
      h: 200,
      w: 128
    },
    bgColor: 'transparent',
    position: {
      x: 0,
      y: 0
    }
  });

  square2.nodeImage.loadImage('assets/img/guy.png');
  square2.nodeImage.update({ boxFitby: 'height' });

  square3.nodeImage.loadImage('assets/img/guy.png');
  square3.nodeImage.update({ boxFitby: 'height' });

  const squareSprite = square.nodeImage;
  squareSprite.update({ boxFitby: 'height' });
  // squareSprite.loadImage(
  //   'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/350b91f0-ad9d-4d63-9a0d-a10361c3b685/d6gfouv-d8377271-7f1b-4256-8dca-8263f3e7a64b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzM1MGI5MWYwLWFkOWQtNGQ2My05YTBkLWExMDM2MWMzYjY4NVwvZDZnZm91di1kODM3NzI3MS03ZjFiLTQyNTYtOGRjYS04MjYzZjNlN2E2NGIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.RhtpRNEMCTlvxgzHQ0XWb-bTV8BwzfppdRjjqlOYx50'
  // );
  squareSprite.loadImage('assets/img/guy.png');

  game.load(
    squareSprite.imageLoadedEvent,
    square2.nodeImage.imageLoadedEvent,
    square3.nodeImage.imageLoadedEvent
  );
  game.init();
  const speed = 0.5;
  game.update((deltaTime) => {
    if (game.isKeyPressed('w')) {
      square.nodeTransform.move('up', speed * deltaTime);
    }
    if (game.isKeyPressed('s')) {
      square.nodeTransform.move('down', speed * deltaTime);
    }
    if (game.isKeyPressed('a')) {
      square.nodeTransform.move('left', speed * deltaTime);
    }
    if (game.isKeyPressed('d')) {
      square.nodeTransform.move('right', speed * deltaTime);
    }
  });
};
