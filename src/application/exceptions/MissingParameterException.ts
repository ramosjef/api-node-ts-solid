export class MissingParameterException extends Error {
    constructor(msg?: string) {
        super(msg || "something is missing, check your parameters.")
    }
}
