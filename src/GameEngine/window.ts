import Node, { NodeProps } from './node.js';
import { Size } from './utils.js';

type GameWindowProps = {
  gameContainer: string;
  size: Size;
};

const GameWindow = ({ gameContainer, size }: GameWindowProps) => {
  const windowElement = document.getElementById(gameContainer);
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

  return {
    gameWindow: windowElement,
    addElement
  };
};

export default GameWindow;
