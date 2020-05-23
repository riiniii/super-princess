import Level from "./Level.js";
import SpriteSheet from "./SpriteSheet.js";
import { createBackgroundLayer, createSpriteLayer } from "./layers.js";

export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadJSON(url) {
  return fetch(url).then((r) => r.json());
}
function loadSpriteSheet(name) {
  return loadJSON(`sprites/${name}.json`)
    .then((sheetSpec) =>
      Promise.all([sheetSpec, loadImage(sheetSpec.imageURL)])
    )
    .then(([sheetSpec, image]) => {
      const { tileWidth, tileHeight } = sheetSpec;
      const sprites = new SpriteSheet(image, tileWidth, tileHeight);

      sheetSpec.tiles.forEach((tileSpec) => {
        // define our sprites and add to SpriteSheet map
        const { name, index } = tileSpec;
        const [x, y] = index;

        sprites.defineTile(name, x, y);
      });
      return sprites;
    });
}
export function loadLevel(name) {
  return loadJSON(`/levels/${name}.json`)
    .then((levelSpec) =>
      Promise.all([levelSpec, loadSpriteSheet(levelSpec.spritesheet)])
    )
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();

      createTiles(level, levelSpec.backgrounds);

      const backgroundLayer = createBackgroundLayer(
        level, //levelSpec.backgrounds,
        backgroundSprites
      );
      level.comp.layers.push(backgroundLayer);

      const spriteLayer = createSpriteLayer(level.entities);
      level.comp.layers.push(spriteLayer);

      return level;
    });
}

export function createTiles(Level, backgrounds) {
  function applyRanges(background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; x++) {
      for (let y = yStart; y < yEnd; y++) {
        Level.tiles.set(x, y, {
          name: background.tile,
          type: background.type,
        });
      }
    }
  }

  backgrounds.forEach((background) => {
    background.ranges.forEach((range) => {
      if (range.length === 4) {
        const [xStart, xLen, yStart, yLen] = range;
        applyRanges(background, xStart, xLen, yStart, yLen);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRanges(background, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRanges(background, xStart, 1, yStart, 1);
      }
    });
  });
}
