import { UserSession } from "../../../domain/entities/UserSession";
import { IUseCase } from "../../../domain/interfaces/core/IUseCase";
import { ILoginRequest } from "./ILoginRequest";

export interface ILoginUseCase extends IUseCase<ILoginRequest, UserSession> { }