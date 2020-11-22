import { AsyncContainerModule } from "inversify";
import { UsersRepository } from "@repositories/inMemory/UsersRepository";
import TYPES from "@domain/core/constants/types";
import { IUsersRepository } from "@domain/users/IUsersRepository";
import { ISignInUseCase } from "@application/useCases/SignIn/ISignInUseCase";
import { SignInUseCase } from "@application/useCases/SignIn/SignInUseCase";
import { ILoginUseCase } from "@application/useCases/Login/ILoginUseCase";
import { LoginUseCase } from "@application/useCases/Login/LoginUseCase";
import { UserSessionsRepository } from "@repositories/inMemory/UserSessionRepository";
import { IUserSessionRepository } from "@domain/userSessions/IUserSessionRepository";
import { InMemoryContext } from "@repositories/inMemory/context/InMemoryContext";
import { GenericRepositoryFactory } from "@repositories/inMemory/GenericRepositoryFactory";
import { IGenericRepositoryFactory } from "@domain/core/interfaces/IGenericRepositoryFactory";

export const bindings = new AsyncContainerModule(async (bind) => {

    //context
    bind<InMemoryContext>(TYPES.DbContext).to(InMemoryContext).inSingletonScope();

    //repositories
    bind<IGenericRepositoryFactory>(TYPES.GenericRepositoryFactory).to(GenericRepositoryFactory)
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository)
    bind<IUserSessionRepository>(TYPES.UserSessionRepository).to(UserSessionsRepository)

    //useCases
    bind<ISignInUseCase>(TYPES.SignInUseCase).to(SignInUseCase)
    bind<ILoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase)

    //providers

    //controllers
    await require("../../api/controllers")
})
