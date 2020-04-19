import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

export function loadPrincessPeachSprite() {
  return loadImage("/images/peach.gif").then((image) => {
    const sprites = new SpriteSheet(image, 32, 45);
    // define our sprites and add to SpriteSheet map
    sprites.define("idle_peach", 340, 0, 32, 45);
    return sprites;
  });
}

export function loadBackgroundSprites() {
  return loadImage("/images/tiles.png").then((image) => {
    const sprites = new SpriteSheet(image, 16, 16);
    // define our sprites and add to SpriteSheet map
    sprites.defineTile("ground", 0, 0);
    sprites.defineTile("sky", 3, 23);
    return sprites;
  });
}
