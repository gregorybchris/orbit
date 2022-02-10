import Vector from "./vector.js";
import { updateLocation } from "./kepler.js";
import Publisher from "./publisher.js";
import Color from "./color.js";

export default class Planet {
  SPEED_MULTIPLIER = 1.0 / 5000;

  constructor(location, focus1, focus2, speed, color = "white") {
    this.id = Planet.numPlanets++;

    this.location = location;
    this.focus1 = focus1;
    this.focus2 = focus2;

    // TODO: Find major and minor axes

    this.center = Vector.average(this.focus1, this.focus2);
    this.theta = Math.atan2(focus2.y - focus1.y, focus2.x - focus1.x);
    this.a = (Vector.dist(this.location, this.focus1) + Vector.dist(this.location, this.focus2)) / 2;
    this.c = Vector.dist(this.focus1, this.center);
    this.b = Math.sqrt(Math.pow(this.a, 2) - Math.pow(this.c, 2));

    console.log("a", this.a);
    console.log("b", this.b);
    console.log("c", this.c);
    console.log("center", this.center);
    console.log("theta", this.theta, (this.theta / Math.PI) * 180);

    this.speed = speed * this.SPEED_MULTIPLIER;
    this.color = Color[color];

    this.publisher = new Publisher();
  }

  move(time) {
    const t = time * this.speed;
    updateLocation(this.location, this.focus1, this.a, this.b, this.c, this.theta, t);
    this.publisher.publish(this);
  }

  onMove(subscriber) {
    this.publisher.subscribe(subscriber);
  }
}

Planet.numPlanets = 0;
