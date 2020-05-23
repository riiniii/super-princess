export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(
    name,
    x,
    y,
    width,
    height,
    dWidth,
    dHeight,
    sourceWidth,
    sourceHeight
  ) {
    const buffers = [true, false].map((flip) => {
      // return non mirrored and mirrored buffer!
      const buffer = document.createElement("canvas");
      buffer.width = width;
      buffer.height = height;

      const context = buffer.getContext("2d");

      // flip! // mirror
      if (flip) {
        context.scale(-1, 1);
        context.translate(-width, 0);
      }

      context.drawImage(
        this.image,
        // location
        x,
        y,
        // size
        sourceWidth || width,
        sourceHeight || height,
        0,
        0,
        dWidth || width,
        dHeight || height
      );

      return buffer;
    });
    // map tiles to be able to access easily when calling draw()
    this.tiles.set(name, buffers);
  }

  defineTile(name, x, y, tile) {
    const { destWidth, destHeight, sourceWidth, sourceHeight } = tile;
    this.define(
      name,
      x * this.width,
      y * this.height,
      this.width,
      this.height,
      destWidth,
      destHeight,
      sourceWidth,
      sourceHeight
    );
  }
  draw(name, context, x, y, flip = false) {
    const isFlipped = flip ? 0 : 1;
    const buffer = this.tiles.get(name)[isFlipped];
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
