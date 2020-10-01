import { BaseHttpController } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { NotAuthenticatedException } from "../../application/exceptions/NotAuthenticatedException";
import { PasswordsDontMatchException } from "../../application/exceptions/PasswordsDontMatchException";
import { UserNotFoundException } from "../../application/exceptions/UserNotFoundException";

export class BaseController extends BaseHttpController {
    protected handleError(error: Error): JsonResult {
        var statusCode = 500;

        if (error instanceof PasswordsDontMatchException ||
            error instanceof UserNotFoundException ||
            error instanceof NotAuthenticatedException)
            statusCode = 401;

        return this.json({
            message: error.message || 'Unexpected error.',
            stack: error.stack
        }, statusCode)
    }
}
