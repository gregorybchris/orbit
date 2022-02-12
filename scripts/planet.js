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

    this.speed = speed * this.SPEED_MULTIPLIER;
    this.color = Color[color];

    this.publisher = new Publisher();
  }

  move(time) {
    const t = time * this.speed;
    updateLocation(this.location, this.focus1, this.focus2, t);
    this.publisher.publish(this);
  }

  onMove(subscriber) {
    this.publisher.subscribe(subscriber);
  }
}

Planet.numPlanets = 0;
