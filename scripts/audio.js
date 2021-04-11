class Audio {
  constructor() {
    this.context = new (window.AudioContext || window.webkitAudioContext)();
  }

  go() {
    const frequencies = [200];
    frequencies.forEach((frequency) => {
      let oscillator = this.context.createOscillator();
      //   oscillator.type = "square";
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
      oscillator.connect(this.context.destination);
      //   oscillator.start();
    });
  }
}

export default Audio;
