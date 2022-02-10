export default class Subscriber {
  constructor(callback) {
    this.callback = callback;
  }

  onMessage(message) {
    this.callback(message);
  }
}
