export class UserNotFoundException extends Error {
    constructor() {
        super("user not found")
        this.stack = this.message;
    }
}
