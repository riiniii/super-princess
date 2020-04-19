import SpriteSheet from "./SpriteSheet.js";
import { loadImage, loadLevel } from "./loaders.js";

function drawBackground(background, context, sprites) {
  console.log(background);
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x++) {
      for (let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

function loadBackgroundSprites() {
  return loadImage("/image/tiles.png").then((image) => {
    const sprites = new SpriteSheet(image, 16, 16);
    // define our sprites and add to SpriteSheet map
    sprites.define("ground", 0, 0);
    sprites.define("sky", 3, 23);
    return sprites;
  });
}

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

context.fillRect(0, 0, 50, 50);

Promise.all([loadBackgroundSprites(), loadLevel("1-1")]).then(
  ([sprites, level]) => {
    loadLevel("1-1").then((level) => {
      console.log(level);
      level.backgrounds.forEach((background) => {
        drawBackground(background, context, sprites);
      });
    });
  }
);
