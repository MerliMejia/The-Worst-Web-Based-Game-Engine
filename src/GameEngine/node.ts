import { Position, Size } from './utils.js';

export type NodeProps = {
  size?: Size;
  bgColor?: string;
  borderColor?: string;
  position?: Position;
};

export type NodeType = {
  props: {
    size: Size;
    bgColor: string;
    borderColor: string;
    position: Position;
  };
  node: HTMLDivElement;
  update: (newProps: NodeProps) => void;
  nodeTransform: NodeTransformType;
};

export type NodeTransformType = {
  move: (direction: 'up' | 'down' | 'left' | 'right', speed: number) => void;
};

const NodeTransform = (node: Omit<NodeType, 'nodeTransform'>) => {
  const move = (direction: 'up' | 'down' | 'left' | 'right', speed: number) => {
    if (!node.props.position) {
      node.props.position = { x: 0, y: 0 };
    }
    switch (direction) {
      case 'up':
        node.update({
          position: {
            x: node.props.position.x,
            y: node.props.position.y - 1 * speed
          }
        });
        break;
      case 'down':
        node.update({
          position: {
            x: node.props.position.x,
            y: (node.props.position.y += 1 * speed)
          }
        });
        break;
      case 'left':
        node.update({
          position: {
            x: (node.props.position.x -= 1 * speed),
            y: node.props.position.y
          }
        });
        break;
      case 'right':
        node.update({
          position: {
            x: (node.props.position.x += 1 * speed),
            y: node.props.position.y
          }
        });
        break;
    }
  };

  return {
    move
  };
};

const Node = ({
  size,
  bgColor,
  borderColor,
  position
}: NodeProps): NodeType => {
  const node = document.createElement('div');

  const update = (newProps: NodeProps) => {
    if (newProps.size) {
      node.style.width = `${newProps.size.w}px`;
      node.style.height = `${newProps.size.h}px`;
    }
    if (newProps.bgColor) node.style.backgroundColor = newProps.bgColor;
    if (newProps.borderColor) node.style.borderColor = newProps.borderColor;
    node.style.position = 'relative';
    if (newProps.position) {
      node.style.left = `${newProps.position.x}px`;
      node.style.top = `${newProps.position.y}px`;
    } else {
      node.style.left = '0px';
      node.style.top = '0px';
    }
  };
  node.style.transition = 'all 0.5s linear';

  update({ size, bgColor, borderColor, position });

  const toReturn = {
    props: { size, bgColor, borderColor, position },
    node,
    update
  };

  const nodeTransform = NodeTransform(toReturn);

  return {
    ...toReturn,
    nodeTransform
  };
};

export default Node;
