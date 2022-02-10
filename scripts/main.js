import Audio from "./audio.js";
import Engine from "./engine.js";
import Planet from "./planet.js";
import Space from "./space.js";
import Sun from "./sun.js";
import Vector from "./vector.js";
import { initGraphics } from "./graphics.js";

const sun = new Sun(new Vector(600, 300));

const space = new Space(sun);

const planet1Focus = new Vector(650, 300);
const planet1Location = new Vector(790, 300);
const planet1 = new Planet(planet1Location, sun.location, planet1Focus, 2.0, "purple");
space.addPlanet(planet1);

const planet2Focus = new Vector(780, 480);
const planet2Location = new Vector(860, 560);
const planet2 = new Planet(planet2Location, sun.location, planet2Focus, 1.6, "orange");
space.addPlanet(planet2);

const planet3Focus = new Vector(440, 120);
const planet3Location = new Vector(400, 70);
const planet3 = new Planet(planet3Location, sun.location, planet3Focus, -1.6, "red");
space.addPlanet(planet3);

const planet4Focus = new Vector(760, 140);
const planet4Location = new Vector(820, 120);
const planet4 = new Planet(planet4Location, sun.location, planet4Focus, -2.6, "blue");
space.addPlanet(planet4);

const audio = new Audio();
const engine = new Engine(space, audio);
initGraphics(space, engine.update);
