import Timer from "./Timer.js";
import { loadLevel } from "./loaders.js";
import { createPrincessPeach } from "./entities.js";
import { createCollisionLayer } from "./layers.js";
import { setupKeyboard } from "./Input.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createPrincessPeach(), loadLevel("1-1")]).then(
  ([princessPeach, level]) => {
    // vectors
    princessPeach.pos.set(0, 0);

    level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(princessPeach);

    const input = setupKeyboard(princessPeach);

    input.listenTo(window);

    ["mousemove", "mousedown"].forEach((eventName) => {
      canvas.addEventListener(eventName, (event) => {
        console.log(eventName, event.button);
        if (event.button === 0) {
          princessPeach.vel.set(0, 0);
          princessPeach.pos.set(event.offsetX, event.offsetY);
        }
      });
    });

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      level.comp.draw(context);
    };
    timer.start(); // init requestAnimationFrame
  }
);
