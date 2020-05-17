import { Trait } from "../Entity.js";
export default class Velocity extends Trait {
  constructor() {
    super("velocity");
  }

  updateTrait(entity, deltaTime) {
    // jump jump speed
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  }
}
