export default class Engine {
  constructor(space, audio) {
    this.space = space;
    this.audio = audio;
    audio.start();
  }

  update = (currentTime, deltaTime) => {
    this.space.planets.forEach((planet) => {
      planet.move(currentTime);
    });
  };
}
