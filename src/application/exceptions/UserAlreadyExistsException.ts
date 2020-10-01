export class UserAlreadyExistsException extends Error {
    constructor(msg?: string) {
        super(msg || "the user you´re trying to create already exists.")
    }
}
