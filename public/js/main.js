import Compositor from "./Compositor.js";
import { loadLevel } from "./loaders.js";
import { loadBackgroundSprites, loadPrincessPeachSprite } from "./sprites.js";
import { createBackgroundLayer } from "./layers.js";
const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

context.fillRect(0, 0, 50, 50);

function createSpriteLayer(sprite, pos) {
  return function drawSpriteLayer(context) {
    for (let i = 0; i < 20; i++) {
      sprite.draw("idle_peach", context, pos.x + i * 32, pos.y);
    }
  };
}

Promise.all([
  loadPrincessPeachSprite(),
  loadBackgroundSprites(),
  loadLevel("1-1"),
]).then(([princessPeachSprite, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer = createBackgroundLayer(
    level.backgrounds,
    backgroundSprites
  );
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 64,
    y: 64,
    update: function updateBy(numberOfPixels) {
      this.x += numberOfPixels;
      this.y += numberOfPixels;
    },
  };
  const spriteLayer = createSpriteLayer(princessPeachSprite, pos);
  comp.layers.push(spriteLayer);

  function update() {
    comp.draw(context);
    // update positions
    pos.update(2);
    requestAnimationFrame(update); // built in browser function, helps make animations more accurate
  }
  update();
});
