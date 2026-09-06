/**
 * mulberry32, so a generated structure is identical on every render and
 * between server and client. Shared by the WebGL scenes: two copies of a PRNG
 * is two seeds to keep in step by hand.
 */
export function seededRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
