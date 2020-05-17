export default class Timer {
  constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateProxy = (time) => {
      accumulatedTime += (time - lastTime) / 1000;
      while (accumulatedTime > deltaTime) {
        this.update(deltaTime); // update() func assigned prototypically in main.js
        accumulatedTime -= deltaTime;
      }

      lastTime = time;

      this.enqueue(); // continue our requestAnimationFrames
    };
  }
  enqueue() {
    requestAnimationFrame(this.updateProxy); // built in browser function, helps make animations more accurate
  }
  start() {
    this.enqueue();
  }
}
