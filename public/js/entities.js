import Entity from "./Entity.js";
import Jump from "./traits/Jump.js";
import Go from "./traits/Go.js";

import { createAnimation } from "./animation.js";
import { loadSpriteSheet } from "./loaders.js";

export function createPrincessPeach() {
  return loadSpriteSheet("peach").then((sprite) => {
    const princessPeach = new Entity();
    princessPeach.size.set(24, 32);

    princessPeach.addTrait(new Go());
    princessPeach.addTrait(new Jump());
    const runAnimation = createAnimation(
      [
        "run-1",
        "run-2",
        "run-3",
        "run-4",
        "run-5",
        "run-6",
        "run-7",
        "run-8",
        "run-9",
        "run-10",
        "run-11",
      ],
      10
    );
    function routeFrame(peach) {
      if (peach.go.dir !== 0) {
        return runAnimation(peach.go.distance);
      }
      return "idle_peach";
    }
    princessPeach.draw = function drawPrincessPeach(context) {
      sprite.draw(
        routeFrame(princessPeach),
        context,
        0,
        0,
        princessPeach.go.heading < 0
      );
    };
    return princessPeach;
  });
}
