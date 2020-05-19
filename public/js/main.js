import Timer from "./Timer.js";
import { loadLevel } from "./loaders.js";
import { createPrincessPeach } from "./entities.js";
import Keyboard from "./KeyboardState.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

context.fillRect(0, 0, 50, 50);

Promise.all([createPrincessPeach(), loadLevel("1-1")]).then(
  ([princessPeach, level]) => {
    const gravity = 50;
    // vectors
    princessPeach.pos.set(64, 80);

    level.entities.add(princessPeach);

    const SPACE = 32;
    const input = new Keyboard();

    input.addMapping(SPACE, (keyState) => {
      if (keyState) {
        princessPeach.jump.start();
      } else {
        princessPeach.jump.cancel();
      }
    });

    input.listenTo(window);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      level.comp.draw(context);

      princessPeach.vel.y += gravity * deltaTime;
    };
    timer.start(); // init requestAnimationFrame
  }
);
