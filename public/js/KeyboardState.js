const PRESSED = 1;
const RELEASE = 0;
export default class KeyboardState {
  constructor() {
    // holds the current state of a given key
    this.keyStates = new Map();
    // holds the callback fcn for a keycode
    this.keyMap = new Map();
  }

  addMapping(keycode, callback) {
    this.keyMap.set(keycode, callback);
  }

  handleEvent(event) {
    const { keyCode } = event;

    if (!this.keyMap.has(keyCode)) {
      // did not have key mapped.
      return false;
    }

    event.preventDefault();

    const keyState = event.type === "keydown" ? PRESSED : RELEASE;

    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    this.keyMap.get(keyCode)(keyState);
    console.log(this.keyMap);
  }

  listenTo(window) {
    ["keydown", "keyup"].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        this.handleEvent(event);
      });
    });
  }
}
