export default class Publisher {
  constructor() {
    this.subscribers = [];
  }

  publish(message) {
    this.subscribers.forEach((subscriber) => {
      subscriber(message);
    });
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}
