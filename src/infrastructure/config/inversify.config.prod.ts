import { AsyncContainerModule } from "inversify";
import { UsersRepository } from "../repositories/mongoDb/UsersRepository";
import TYPES from "../../domain/core/constants/types";
import { IUsersRepository } from "../../domain/users/IUsersRepository";
import { ISignInUseCase } from "../../application/useCases/SignIn/ISignInUseCase";
import { SignInUseCase } from "../../application/useCases/SignIn/SignInUseCase";
import { ILoginUseCase } from "../../application/useCases/Login/ILoginUseCase";
import { LoginUseCase } from "../../application/useCases/Login/LoginUseCase";
import { UserSessionsRepository } from "../repositories/mongoDb/UserSessionRepository";
import { IUserSessionRepository } from "../../domain/userSessions/IUserSessionRepository";
import { MongoDbContext } from "../repositories/mongoDb/context/MongoDbContext";
import { GenericRepositoryFactory } from "../repositories/mongoDb/GenericRepositoryFactory";
import { IGenericRepositoryFactory } from "../../domain/core/interfaces/IGenericRepositoryFactory";

export const bindings = new AsyncContainerModule(async (bind) => {

    //mongo
    bind<MongoDbContext>(TYPES.DbContext).to(MongoDbContext).inSingletonScope();

    //repositories
    bind<IGenericRepositoryFactory>(TYPES.GenericRepositoryFactory).to(GenericRepositoryFactory);
    bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);
    bind<IUserSessionRepository>(TYPES.UserSessionRepository).to(UserSessionsRepository);

    //useCases
    bind<ISignInUseCase>(TYPES.SignInUseCase).to(SignInUseCase)
    bind<ILoginUseCase>(TYPES.LoginUseCase).to(LoginUseCase)

    //providers

    //controllers
    await require("../../api/controllers")
})
