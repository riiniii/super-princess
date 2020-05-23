import Entity from "./Entity.js";
import Jump from "./traits/Jump.js";
import Velocity from "./traits/Velocity.js";
import Go from "./traits/Go.js";

import { loadPrincessPeachSprite } from "./sprites.js";

export function createPrincessPeach() {
  return loadPrincessPeachSprite().then((sprite) => {
    const princessPeach = new Entity();
    princessPeach.size.set(14, 16);

    princessPeach.addTrait(new Go());
    princessPeach.addTrait(new Jump());

    princessPeach.draw = function drawPrincessPeach(context) {
      sprite.draw("idle_peach", context, 0, 0);
    };
    return princessPeach;
  });
}
