import Node, { NodeProps } from './node.js';
import { Size } from './utils.js';

type GameWindowProps = {
  gameContainer: string;
  size: Size;
};

type InputDirection = 'UP' | 'DOWN';

type InputEventProps = {
  key: string;
  direction: InputDirection;
};

const GameWindow = ({ gameContainer, size }: GameWindowProps) => {
  const windowElement = document.getElementById(gameContainer);
  let lastTime = 0;
  let deltaTime = 0;
  const currentPressedKeys = new Set<string>();

  const updateEvent = new CustomEvent('updateEvent', { detail: deltaTime });

  const inputEvent = (key: string, direction: InputDirection) =>
    new CustomEvent<InputEventProps>('inputEvent', {
      detail: {
        key,
        direction
      }
    });

  if (windowElement) {
    windowElement.style.width = `${size.w}px`;
    windowElement.style.height = `${size.h}px`;
    windowElement.style.position = 'absolute';
  }

  const addElement = (element: NodeProps) => {
    const newNode = Node({
      size: element.size,
      bgColor: element.bgColor,
      borderColor: element.borderColor,
      position: element.position
    });

    windowElement.appendChild(newNode.node);
    return newNode;
  };

  const start = () => {
    addEventListener('keydown', (e) => {
      dispatchEvent(inputEvent(e.key, 'DOWN'));
    });

    addEventListener('keyup', (e) => {
      dispatchEvent(inputEvent(e.key, 'UP'));
    });

    onInputHandler();
  };

  const onInputHandler = () => {
    addEventListener(
      'inputEvent',
      (
        e: Event & {
          detail: InputEventProps;
        }
      ) => {
        const { key, direction } = e.detail;
        if (direction === 'DOWN') {
          currentPressedKeys.add(key);
        } else {
          currentPressedKeys.delete(key);
        }
      }
    );
  };

  const isKeyPressed = (key: string) => currentPressedKeys.has(key);

  const update = (callback: (time: number) => void) => {
    addEventListener('updateEvent', () => callback(deltaTime));
  };

  const init = () => {
    start();
    const loop = (currentTime: number) => {
      deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      dispatchEvent(updateEvent);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };

  return {
    gameWindow: windowElement,
    addElement,
    init,
    update,
    isKeyPressed
  };
};

export default GameWindow;
