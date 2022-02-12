export default class Audio {
  constructor() {
    console.log("Audio initialized");
  }

  play() {
    console.log("Playing audio");

    const now = Tone.now();

    const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();
    polySynth.triggerAttack("D4", now);
    polySynth.triggerAttack("F4", now);
    polySynth.triggerAttack("A4", now);
    polySynth.triggerAttack("C5", now);
    polySynth.triggerRelease(["D4", "F4", "A4", "C5"], now + 1);

    polySynth.triggerAttack("E4", now + 1);
    polySynth.triggerAttack("G4", now + 1);
    polySynth.triggerAttack("B4", now + 1);
    polySynth.triggerAttack("D5", now + 1);
    polySynth.triggerRelease(["E4", "G4", "B4", "D5"], now + 2);

    polySynth.triggerAttack("F4", now + 2);
    polySynth.triggerAttack("A4", now + 2);
    polySynth.triggerAttack("C5", now + 2);
    polySynth.triggerAttack("E5", now + 2);
    polySynth.triggerRelease(["F4", "A4", "C5", "E5"], now + 3);

    // const osc = new Tone.Oscillator(440, "sine").toDestination().start().stop();

    // const syntherRelease(now = new Tone.Synth().toDestination();
    // synth.triggerAttack("C4", now);
    // synth.trigg + 1);

    // const oscillator = this.context.createOscillator();
    // oscillator.type = "square";
    // oscillator.frequency.setValueAtTime(240, this.context.currentTime);
    // oscillator.connect(this.context.destination);
    // oscillator.start();
  }
}
