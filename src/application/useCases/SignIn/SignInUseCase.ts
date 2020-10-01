import { IUsersRepository } from "../../../domain/interfaces/repositories/IUsersRepository";
import { IMailProvider } from "../../../domain/interfaces/providers/IMailProvider";
import { ISignInRequest } from "./ISignInRequest";
import { User } from "../../../domain/entities/User";
import { ISignInUseCase } from "./ISignInUseCase";
import { injectable, inject } from "inversify";
import TYPES from "../../../domain/constants/types";
import * as bcrypt from "bcrypt"
import { MissingParameterException } from "../../exceptions/MissingParameterException";
import { UserAlreadyExistsException } from "../../exceptions/UserAlreadyExistsException";

@injectable()
export class SignInUseCase implements ISignInUseCase {
    @inject(TYPES.UsersRepository) private readonly _usersRepository: IUsersRepository
    @inject(TYPES.MailProvider) private readonly _mailProvider: IMailProvider

    async Execute(request: ISignInRequest): Promise<void> {

        if (!request.email || !request.name || !request.password)
            throw new MissingParameterException();

        let userAreadyExists = await this._usersRepository.Find(p => p.email == request.email)
        if (userAreadyExists)
            throw new UserAlreadyExistsException()

        request.password = await this.CryptPassword(request.password)

        let user = new User(request)
        await this._usersRepository.Create(user)

        //await this._mailProvider.SendMail({
        //    to: {
        //        name: user.name,
        //        email: user.email
        //    },
        //    from: {
        //        name: "Equipe do meu app",
        //        email: "welcome@meuapp.com"
        //    },
        //    subject: "Seja bem-vindo à plataforma",
        //    body: "<h1>Corpo do email de boas vindas.</h1>"
        //})
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
