export default class SpriteSheet {
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
  }

  define(name, x, y) {
    const buffer = document.createElement("canvas");
    buffer.width = this.width;
    buffer.height = this.height;
    console.log("this in define", this);
    buffer.getContext("2d").drawImage(
      this.image,
      // location
      x * this.width,
      y * this.height,
      // size
      this.width,
      this.height,
      0,
      0,
      this.width,
      this.height
    );
    // map tiles to be able to access easily when calling draw()
    this.tiles.set(name, buffer);
  }

  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
  }

  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
