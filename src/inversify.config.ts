import { AsyncContainerModule } from "inversify";
import { UsersRepository } from "./infrastructure/repositories/inMemory/UsersRepository";
import TYPES from "./domain/constants/types";
import { IUsersRepository } from "./domain/interfaces/repositories/IUsersRepository";
import { IMailProvider } from "./domain/interfaces/providers/IMailProvider";
import { MailtrapMailProvider } from "./infrastructure/providers/MailtrapMailProvider";
import { ISignInUseCase } from "./application/useCases/SignIn/ISignInUseCase";
import { SignInUseCase } from "./application/useCases/SignIn/SignInUseCase";
import { ILoginUseCase } from "./application/useCases/Login/ILoginUseCase";
import { LoginUseCase } from "./application/useCases/Login/LoginUseCase";
import { GetUserByTokenUseCase } from "./application/useCases/GetUserByToken/GetUserByTokenUseCase";
import { IGetUserByTokenUseCase } from "./application/useCases/GetUserByToken/IGetUserByTokenUseCase";
import { ISignInWithGoogleUseCase } from "./application/useCases/SignInWithGoogle/ISignInWithGoogleUseCase";
import { SignInWithGoogleUseCase } from "./application/useCases/SignInWithGoogle/SignInWithGoogleUseCase";
import { UserSessionsRepository } from "./infrastructure/repositories/inMemory/UserSessionRepository";
import { IUserSessionRepository } from "./domain/interfaces/repositories/IUserSessionRepository";

export const bindings = new AsyncContainerModule(async (bind) => {

    //controllers
    await require("./api/controllers")

    //providers
    bind<IMailProvider>(TYPES.MailProvider).to(MailtrapMailProvider)

    //repositories
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope()
    bind<IUserSessionRepository>(TYPES.UserSessionRepository).to(UserSessionsRepository).inSingletonScope()

    //useCases
    bind<ISignInUseCase>(TYPES.SignInUseCase).to(SignInUseCase)
    bind<ILoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase)
    bind<IGetUserByTokenUseCase>(TYPES.GetUserByTokenUseCase).to(GetUserByTokenUseCase)
    bind<ISignInWithGoogleUseCase>(TYPES.SignInWithGoogleUseCase).to(SignInWithGoogleUseCase)

})
