import Node, { NodeProps } from './node.js';
import { CustomEventProps, Size } from './utils.js';

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
  const framesElement = document.getElementById('frames');
  let lastTime = 0;
  let deltaTime = 0;
  let fps = 0;
  let lastFpsUpdateTime = 0;
  const currentPressedKeys = new Set<string>();
  const startEvents = new Map<string, Event>();

  const updateEvent = new CustomEvent('updateEvent', { detail: deltaTime });
  let loadEventCalls = 0;
  let isLoading = true;
  let loadingProgress = 0;

  let didCallInit = false;

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

  const load = (...events: CustomEventProps[]) => {
    if (didCallInit) throw new Error('You can only call load before init');
    loadEventCalls++;
    console.log('LOADING START EVENTS');
    for (let i = 0; i < events.length; i++) {
      const { event, name } = events[i];
      addEventListener(name, () => {
        startEvents.delete(name);
      });
      startEvents.set(name, event);
    }

    if (startEvents.size === 0) {
      console.log('NO START EVENTS, STARTING GAME');
      isLoading = false;
      loadingProgress = 1;
      start();
      return;
    }

    const initialStartEventsSize = startEvents.size;
    const loadInterval = setInterval(() => {
      if (startEvents.size === 0) {
        console.log('START EVENTS LOADED, STARTING GAME');
        isLoading = false;
        start();
        clearInterval(loadInterval);
      } else {
        loadingProgress =
          (initialStartEventsSize - startEvents.size) / initialStartEventsSize;
        console.log(
          `WAITING FOR START EVENTS: ${startEvents.size} events left. - ${
            loadingProgress * 100
          }%`
        );
      }
    }, 1);
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
    didCallInit = true;
    if (loadEventCalls === 0) {
      console.log('NO LOAD EVENTS, STARTING GAME');
      start();
    }
    const loop = (currentTime: number) => {
      deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      dispatchEvent(updateEvent);
      requestAnimationFrame(loop);
      // Calculate FPS
      fps++;
      const now = performance.now();
      if (now - lastFpsUpdateTime >= 1000) {
        framesElement.innerText = `FPS: ${fps}`;
        if (fps >= 60) {
          framesElement.style.color = 'chartreuse';
        } else if (fps < 60 && fps >= 30) {
          framesElement.style.color = 'yellow';
        } else {
          framesElement.style.color = 'crimson';
        }
        fps = 0;
        lastFpsUpdateTime = now;
      }
    };
    requestAnimationFrame(loop);
  };

  const info = () => ({
    isLoading,
    loadingProgress
  });

  return {
    gameWindow: windowElement,
    addElement,
    init,
    update,
    load,
    isKeyPressed,
    info
  };
};

export default GameWindow;
