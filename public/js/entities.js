import Entity from "./Entity.js";
import Jump from "./traits/Jump.js";
import Velocity from "./traits/Velocity.js";
import { loadPrincessPeachSprite } from "./sprites.js";

export function createPrincessPeach() {
  return loadPrincessPeachSprite().then((sprite) => {
    const princessPeach = new Entity();

    princessPeach.addTrait(new Velocity());
    princessPeach.addTrait(new Jump());
    princessPeach.draw = function drawPrincessPeach(context) {
      sprite.draw("idle_peach", context, this.pos.x + 32, this.pos.y);
    };
    return princessPeach;
  });
}
