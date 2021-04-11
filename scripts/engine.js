class Engine {
  constructor(space) {
    this.space = space;
  }

  update = (currentTime, deltaTime) => {
    this.space.planets.forEach((planet) => {
      planet.move(deltaTime);
    });
  };
}

export default Engine;
