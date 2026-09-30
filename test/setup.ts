import '@testing-library/jest-dom/vitest'

// jsdom does not implement requestAnimationFrame timing that Modal relies on,
// and does not implement scrollTo. Both are stubbed, not polyfilled with delays.
if (typeof globalThis.requestAnimationFrame === 'undefined') {
  globalThis.requestAnimationFrame = ((cb: FrameRequestCallback) =>
    setTimeout(() => cb(0), 0) as unknown as number) as typeof requestAnimationFrame
}
