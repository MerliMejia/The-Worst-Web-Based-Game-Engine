import { Position, Size } from './utils.js';

export type NodeProps = {
  size: Size;
  bgColor?: string;
  borderColor?: string;
  initialPosition?: Position;
};

export type NodeType = ({
  size,
  bgColor,
  borderColor,
  initialPosition
}: NodeProps) => HTMLDivElement;

const Node = ({ size, bgColor, borderColor, initialPosition }: NodeProps) => {
  const node = document.createElement('div');
  const update = (newProps: NodeProps) => {
    node.style.width = `${newProps.size.w}px`;
    node.style.height = `${newProps.size.h}px`;
    if (newProps.bgColor) node.style.backgroundColor = newProps.bgColor;
    if (newProps.borderColor) node.style.borderColor = newProps.borderColor;
    node.style.position = 'relative';
    if (newProps.initialPosition) {
      node.style.left = `${newProps.initialPosition.x}px`;
      node.style.top = `${newProps.initialPosition.y}px`;
    } else {
      node.style.left = '0px';
      node.style.top = '0px';
    }
  };
  node.style.transition = 'all 0.5s ease-in-out';

  update({ size, bgColor, borderColor, initialPosition });
  return {
    props: { size, bgColor, borderColor, initialPosition },
    node,
    update
  };
};

export default Node;
