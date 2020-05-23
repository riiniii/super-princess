import TileResolver from "./TileResolver.js";

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }
  checkY(entity) {
    let y;
    // check up or down?
    if (entity.vel.y > 0) {
      // up
      y = entity.pos.y + entity.size.y; // use upper y
    } else if (entity.vel.y < 0) {
      y = entity.pos.y; // use lower y
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      entity.pos.x,
      entity.pos.x + entity.size.x,
      y,
      y
    );
    matches.forEach((match) => {
      if (match.tile.type !== "ground") {
        return;
      }

      if (entity.vel.y > 0) {
        // jumping
        if (entity.pos.y + entity.size.y > match.y1) {
          // on top
          entity.pos.y = match.y1 - entity.size.y;
          entity.vel.y = 0;
        }
      } else if (entity.vel.y < 0) {
        // falling
        if (entity.pos.y < match.y2) {
          // under
          entity.pos.y = match.y2;
          entity.vel.y = 0;
        }
      }
    });
  }

  checkX(entity) {
    let x;
    // check left or right?
    if (entity.vel.x > 0) {
      x = entity.pos.x + entity.size.x; // x from the right side of mario
    } else if (entity.vel.x < 0) {
      x = entity.pos.x; // x from the left isde, which is just pos.x
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
      x,
      x,
      entity.pos.y,
      entity.pos.y + entity.size.y
    );

    matches.forEach((match) => {
      if (match.tile.type !== "ground") {
        return;
      }

      if (entity.vel.x > 0) {
        // jumping
        if (entity.pos.x + entity.size.x > match.x1) {
          // on top
          entity.pos.x = match.x1 - entity.size.x;
          entity.vel.x = 0;
        }
      } else if (entity.vel.x <= 0) {
        // falling
        if (entity.pos.x < match.x2) {
          // under
          entity.pos.x = match.x2;
          entity.vel.x = 0;
        }
      }
    });
  }
}
