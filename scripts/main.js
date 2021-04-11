import Audio from "./audio.js";
import Engine from "./engine.js";
import Planet from "./planet.js";
import Space from "./space.js";
import Sun from "./sun.js";
import Vector from "./vector.js";
import { initGraphics } from "./graphics.js";

const sun = new Sun(new Vector(250, 250));
const space = new Space(sun);
space.addPlanet(new Planet(new Vector(50, 100)));
space.addPlanet(new Planet(new Vector(200, 300)));
space.addPlanet(new Planet(new Vector(300, 100)));

const engine = new Engine(space);

const onUpdate = (currentTime, deltaTime) => {
  engine.update(currentTime, deltaTime);
};

const audio = new Audio();
audio.go();

initGraphics(space, onUpdate);
