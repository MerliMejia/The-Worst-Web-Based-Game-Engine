import { NodeProps } from './node.js';
import { CustomEventProps, UUID } from './utils.js';

export type NodeImageType = {
  imageNode: HTMLImageElement;
  imageLoadedEvent: CustomEventProps;
  loadImage: (src: string) => void;
  onImagedLoaded: (callback: () => void) => void;
  update: (newProps: NodeImageProps) => void;
};

export type NodeImageProps = {
  boxFitby?: 'width' | 'height';
} & NodeProps;

const NodeImage = (props?: NodeImageProps): NodeImageType => {
  const eventName = UUID();
  const imageNode = document.createElement('img');
  const imageLoadedEvent: CustomEventProps = {
    name: eventName,
    event: new CustomEvent(eventName)
  };

  const update = (newProps: NodeImageProps) => {
    if (newProps.size) {
      if (newProps.size.w) {
        imageNode.style.width = newProps.size.w + 'px';
      }
      if (newProps.size.h) {
        imageNode.style.height = newProps.size.h + 'px';
      }
    }
    if (newProps.position) {
      if (newProps.position.x) {
        imageNode.style.left = newProps.position.x + 'px';
      }
      if (newProps.position.y) {
        imageNode.style.top = newProps.position.y + 'px';
      }
    }
    if (newProps.boxFitby) {
      if (newProps.boxFitby === 'width') {
        imageNode.style.width = '100%';
        imageNode.style.height = 'auto';
      } else if (newProps.boxFitby === 'height') {
        imageNode.style.width = 'auto';
        imageNode.style.height = '100%';
      }
    }
  };

  imageNode.style.position = 'relative';
  update(props || {});

  const loadImage = (src: string) => {
    imageNode.src = src;
    imageNode.onload = () => {
      dispatchEvent(imageLoadedEvent.event);
    };
  };

  const onImagedLoaded = (callback: () => void) => {
    addEventListener(imageLoadedEvent.name, callback);
  };

  return {
    imageNode,
    imageLoadedEvent,
    loadImage,
    onImagedLoaded,
    update
  };
};

export default NodeImage;
