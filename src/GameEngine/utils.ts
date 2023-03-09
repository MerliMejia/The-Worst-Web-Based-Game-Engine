export type Size = {
  w: number;
  h: number;
};

export type Position = {
  x: number;
  y: number;
};

export type CustomEventProps = {
  name: string;
  event: Event;
};

export function UUID() {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var uuid = '';
  for (var i = 0; i < 6; i++) {
    var randomNum = Math.floor(Math.random() * chars.length);
    uuid += chars[randomNum];
  }
  return uuid;
}
