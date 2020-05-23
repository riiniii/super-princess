import Timer from "./Timer.js";
import { loadLevel } from "./loaders.js";
import { createPrincessPeach } from "./entities.js";
import { createCollisionLayer, createCameraLayer } from "./layers.js";
import { setupKeyboard } from "./Input.js";
import { setupMouseControl } from "./Debug.js";
import Camera from "./Camera.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([createPrincessPeach(), loadLevel("1-1")]).then(
  ([princessPeach, level]) => {
    const camera = new Camera();
    window.camera = camera;
    // vectors
    princessPeach.pos.set(64, 64);

    level.comp.layers.push(
      createCollisionLayer(level),
      createCameraLayer(camera)
    );

    level.entities.add(princessPeach);

    const input = setupKeyboard(princessPeach);
    setupMouseControl(canvas, princessPeach, camera);
    input.listenTo(window);

    const timer = new Timer(1 / 60);
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      level.comp.draw(context, camera);
    };
    timer.start(); // init requestAnimationFrame
  }
);
