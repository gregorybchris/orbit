export default class Space {
  constructor(sun) {
    this.sun = sun;
    this.planets = [];
  }

  addPlanet(planet) {
    this.planets.push(planet);
  }
}
