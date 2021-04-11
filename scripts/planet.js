class Planet {
  constructor(location, focusA, focusB) {
    this.id = Planet.numPlanets++;
    this.location = location;

    this.para = 0;
    this.foci = [0, 0];
    this.baseX = location.x;
    this.baseY = location.y;

    this.color = "rgb(120, 120, 120)";

    this.subscribers = [];
  }

  move(deltaTime) {
    this.para += deltaTime;
    const speed = 1.0 / 120.0;
    const a = 20;
    const b = 14;
    this.location.x = this.baseX + a * Math.cos(this.para * speed);
    this.location.y = this.baseY + b * Math.sin(this.para * speed);
    this.publish();
  }

  publish() {
    this.subscribers.forEach((subscriber) => {
      subscriber(this);
    });
  }

  subscribe(subscriber) {
    this.subscribers.push(subscriber);
  }
}

Planet.numPlanets = 0;

export default Planet;
