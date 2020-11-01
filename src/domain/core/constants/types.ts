const RepositoryTypes = {
    DbContext: Symbol("DbContext"),
    GenericRepositoryFactory: Symbol("GenericRepository"),
    UsersRepository: Symbol("UsersRepository"),
    UserSessionRepository: Symbol("UserSessionRepository"),
}

const UseCaseTypes = {
    SignInUseCase: Symbol("SignInUseCase"),
    LoginUseCase: Symbol("LoginUseCase"),
}

const ProviderTypes = {
    MailProvider: Symbol("MailProvider"),
}

const EntityTypes = {
    User: "User",
    UserSession: "UserSession",
}

let TYPES = {
    ...RepositoryTypes,
    ...UseCaseTypes,
    ...ProviderTypes,
    ...EntityTypes,
}

export default TYPES