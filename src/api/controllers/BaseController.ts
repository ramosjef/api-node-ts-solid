import { BaseHttpController } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { NotAuthenticatedException } from "@application/exceptions/NotAuthenticatedException";
import { PasswordsDontMatchException } from "@application/exceptions/PasswordsDontMatchException";
import { UserNotFoundException } from "@application/exceptions/UserNotFoundException";
import { ValidationError } from 'joi'

export class BaseController extends BaseHttpController {

    protected handleError(error: Error): JsonResult {

        let statusCode = this._GetErrorStatusCode(error);

        return this.json({
            message: error.message || 'Unexpected error.',
            stack: process.env.NODE_ENV == "dev" ? error.stack : error.message
        }, statusCode)

    }

    private _GetErrorStatusCode(error: Error) {

        switch (true) {
            case error instanceof PasswordsDontMatchException:
            case error instanceof UserNotFoundException:
            case error instanceof NotAuthenticatedException:
                return 401;

            case error instanceof ValidationError:
                return 400;

            default:
                return 500;
        }

    }
}
