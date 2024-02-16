export default function createErrorType (name) {
  return class extends Error {
    constructor (message) {
      super(message)

      this.name = name
    }
  }
}
