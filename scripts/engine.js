export default class Engine {
  constructor(space, audio) {
    this.space = space;
    this.audio = audio;
    // audio.start();
  }

  update = (currentTime, deltaTime) => {
    this.space.planets.forEach((planet) => {
      planet.move(currentTime);
    });
  };

  getAudioPermission(attempt = 0) {
    const messageText = attempt == 0 ? "" : "Audio is required to use this demo";
    Swal.fire({
      title: "Allow audio?",
      text: messageText,
      confirmButtonText: "Yes!",
      customClass: {
        container: "alert-container",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.audio.play();
      } else {
        this.getAudioPermission(attempt + 1);
      }
    });
  }
}
