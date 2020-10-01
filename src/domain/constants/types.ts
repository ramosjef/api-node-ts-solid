let TYPES = {
    //Repositories
    GenericRepository: Symbol("GenericRepository"),
    UsersRepository: Symbol("UsersRepository"),
    UserSessionRepository: Symbol("UserSessionRepository"),
    //Providers
    MailProvider: Symbol("MailProvider"),
    //UseCases
    SignInUseCase: Symbol("SignInUseCase"),
    LoginUseCase: Symbol("LoginUseCase"),
    GetUserByTokenUseCase: Symbol("GetUserByTokenUseCase"),
    SignInWithGoogleUseCase: Symbol("SignInWithGoogleUseCase"),
};

export default TYPES;