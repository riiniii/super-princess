export function setupMouseControl(canvas, entity, camera) {
  let lastEvent;

  ["mousemove", "click"].forEach((eventName) => {
    canvas.addEventListener(eventName, (event) => {
      if (event.button === 0 && !event.ctrlKey) {
        entity.vel.set(0, 0);
        entity.pos.set(
          event.offsetX + camera.pos.x,
          event.offsetY + camera.pos.y
        );
        // to-do: make this work for ctrl click and mouse right clicks too
      } else if (
        event.ctrlKey &&
        lastEvent &&
        lastEvent.ctrlKey &&
        lastEvent.type === "mousemove"
      ) {
        //   move
        camera.pos.x -= event.offsetX - lastEvent.offsetX;
      }

      lastEvent = event;
    });
  });

  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
}
