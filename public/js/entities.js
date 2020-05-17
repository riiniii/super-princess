import Entity from "./Entity.js";
import { loadPrincessPeachSprite } from "./sprites.js";
export function createPrincessPeach() {
  return loadPrincessPeachSprite().then((sprite) => {
    const princessPeach = new Entity();

    // this will be from princess peach :D
    princessPeach.update = function updatePrincessPeach(deltaTime) {
      // update positions
      this.pos.x += this.vel.x * deltaTime;
      this.pos.y += this.vel.y * deltaTime;
    };
    princessPeach.draw = function drawPrincessPeach(context) {
      sprite.draw("idle_peach", context, this.pos.x + 32, this.pos.y);
    };
    return princessPeach;
  });
}
