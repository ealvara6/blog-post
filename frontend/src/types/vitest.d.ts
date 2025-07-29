import '@testing-library/jest-dom'

declare global {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface Assertion extends jest.Matchers<void> {}
  }
}
