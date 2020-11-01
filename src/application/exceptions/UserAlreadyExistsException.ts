export class UserAlreadyExistsException extends Error {
    constructor() {
        super("user already exists.")
        this.stack = this.message;
    }
}
