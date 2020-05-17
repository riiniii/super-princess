import { Vec2 } from "./math.js";

export class Trait {
  constructor(name) {
    this.NAME = name;
  }

  updateTrait() {
    console.warn("Unhandled update call in trait");
  }
}

export default class Entity {
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);

    this.traits = [];
  }
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }
  updateTraits(deltaTime) {
    this.traits.forEach((trait) => {
      trait.updateTrait(this, deltaTime);
    });
  }
}
