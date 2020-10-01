import { inject, injectable } from "inversify";
import TYPES from "../../../domain/constants/types";
import { OAuth2Client, TokenPayload } from 'google-auth-library'
import { UserSession } from "../../../domain/entities/UserSession";
import { User } from "../../../domain/entities/User";
import { ISignInWithGoogleRequest } from "./ISignInWithGoogleRequest";
import { ISignInWithGoogleUseCase } from "./ISignInWithGoogleUseCase";
import { IUserSessionRepository } from "../../../domain/interfaces/repositories/IUserSessionRepository";
import { IUsersRepository } from "../../../domain/interfaces/repositories/IUsersRepository";

@injectable()
export class SignInWithGoogleUseCase implements ISignInWithGoogleUseCase {

    @inject(TYPES.UserSessionRepository) private readonly _userSessionRepository: IUserSessionRepository
    @inject(TYPES.UsersRepository) private readonly _usersRepository: IUsersRepository

    async Execute(
        req: ISignInWithGoogleRequest): Promise<UserSession> {

        const payload = await this.loadGooglePayload(req);

        let user = await this.findOrCreateUser(payload);

        let session = await this.createSession(req, user);

        return session;
    }

    private async createSession(
        req: ISignInWithGoogleRequest,
        user: User): Promise<UserSession> {

        let session: UserSession = new UserSession({
            token: req.token,
            userId: user.id
        });
        session.id = await this._userSessionRepository.Create(session);

        return session;
    }

    private async findOrCreateUser(payload: TokenPayload) {
        let user = await this._usersRepository.Find(p => p.email == payload.email);

        if (!user) {
            user = new User({ ...payload });
            user.id = await this._usersRepository.Create(user);

            //Enviar email de boas vindas
            //Criar caso de uso?
        }

        return user;
    }

    private async loadGooglePayload(req: ISignInWithGoogleRequest) {
        let googleClientId = process.env.GOOGLE_CLIENT_ID;

        const client = new OAuth2Client(googleClientId);
        const ticket = await client.verifyIdToken({
            idToken: req.token,
            audience: googleClientId
        });
        const payload = ticket.getPayload(); 
        return payload;
    }
}
