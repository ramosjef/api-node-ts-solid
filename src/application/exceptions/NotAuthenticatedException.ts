export class NotAuthenticatedException extends Error {
    constructor() {
        super('User not authenticated')
    }
}