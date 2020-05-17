import Compositor from "./Compositor.js";
import Timer from "./Timer.js";
import { loadLevel } from "./loaders.js";
import { createPrincessPeach } from "./entities.js";
import { loadBackgroundSprites } from "./sprites.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";
import Keyboard from "./KeyboardState.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

context.fillRect(0, 0, 50, 50);

Promise.all([
  createPrincessPeach(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([princessPeach, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  comp.layers.push(backgroundLayer);
  const gravity = 500;
  // vectors
  princessPeach.pos.set(64, 180);

  const SPACE = 32;
  const input = new Keyboard();

  input.addMapping(SPACE, (keyState) => {
    if (keyState) {
      princessPeach.jump.start();
    } else {
      princessPeach.jump.cancel();
    }
    console.log(keyState);
  });

  input.listenTo(window);

  const spriteLayer = createSpriteLayer(princessPeach);
  comp.layers.push(spriteLayer);

  const timer = new Timer(1 / 60);
  timer.update = function update(deltaTime) {
    princessPeach.updateTraits(deltaTime);
    comp.draw(context);

    princessPeach.vel.y += gravity * deltaTime;
  };
  timer.start(); // init requestAnimationFrame
});
