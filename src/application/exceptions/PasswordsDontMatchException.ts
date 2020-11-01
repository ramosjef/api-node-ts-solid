export class PasswordsDontMatchException extends Error {
    constructor() {
        super("wrong user password")
        this.stack = this.message;
    }
}
