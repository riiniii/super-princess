import SpriteSheet from "./SpriteSheet.js";
import { loadImage } from "./loaders.js";

export function loadPrincessPeachSprite() {
  return loadImage("/images/peach.gif").then((image) => {
    const sprites = new SpriteSheet(image, 32, 45);
    // define our sprites and add to SpriteSheet map
    const peachSize = { x: 32, y: 45 };
    sprites.define(
      "idle_peach",
      340,
      0,
      peachSize.x,
      peachSize.y,
      undefined,
      -2,
      14, // (peachSize.x * 2) / 3,
      20 // (peachSize.y * 2) / 3
    );
    return sprites;
  });
}
