import { IUsersRepository } from "@domain/users/IUsersRepository";
import { ISignInRequest } from "./ISignInRequest";
import { User } from "@domain/users/User";
import { ISignInUseCase } from "./ISignInUseCase";
import { injectable, inject } from "inversify";
import TYPES from "@domain/core/constants/types";
import * as bcrypt from "bcrypt"
import { UserAlreadyExistsException } from "../../exceptions/UserAlreadyExistsException";
import SigninRequestValidation from "./SignInRequestValidation";

@injectable()
export class SignInUseCase implements ISignInUseCase {

    private readonly _usersRepository: IUsersRepository

    constructor(
        @inject(TYPES.UsersRepository) usersRepository: IUsersRepository
    ) {
        this._usersRepository = usersRepository;
    }


    async Execute(request: ISignInRequest): Promise<void> {

        await SigninRequestValidation.validateAsync(request, {});

        let userAreadyExists = await this._usersRepository.FindByEmail(request.email)
        if (userAreadyExists)
            throw new UserAlreadyExistsException()

        request.password = await this.CryptPassword(request.password)

        let user = new User(request)
        await this._usersRepository.Create(user)
    }

    private async CryptPassword(password: string): Promise<string> {
        return new Promise((res, rej) => {
            bcrypt.genSalt(10, (err, salt) => {
                if (err) return rej(err)
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) return rej(err)
                    return res(hash)
                });
            });
        })
    }
}
