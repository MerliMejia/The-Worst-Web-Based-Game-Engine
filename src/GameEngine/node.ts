import { Position, Size } from './utils.js';

export type NodeProps = {
  size: Size;
  bgColor?: string;
  borderColor?: string;
  position?: Position;
};

export type NodeType = ({
  size,
  bgColor,
  borderColor,
  position
}: NodeProps) => HTMLDivElement;

const Node = ({ size, bgColor, borderColor, position }: NodeProps) => {
  const node = document.createElement('div');
  const update = (newProps: NodeProps) => {
    node.style.width = `${newProps.size.w}px`;
    node.style.height = `${newProps.size.h}px`;
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
  return {
    props: { size, bgColor, borderColor, position },
    node,
    update
  };
};

export default Node;
