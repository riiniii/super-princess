export function createAnimation(frames, frameLen) {
  return function resolveFrame(animationDistance) {
    const frameIndex = Math.floor(animationDistance / frameLen) % frames.length;
    const frameName = frames[frameIndex];
    return frameName;
  };
}
