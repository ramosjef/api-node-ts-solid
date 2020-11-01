export class NotAuthenticatedException extends Error {
    constructor() {
        super('user not authenticated')
        this.stack = this.message
    }
}
