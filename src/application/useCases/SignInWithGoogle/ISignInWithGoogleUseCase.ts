import { UserSession } from "../../../domain/entities/UserSession";
import { IUseCase } from "../../../domain/interfaces/core/IUseCase";
import { ISignInWithGoogleRequest } from "./ISignInWithGoogleRequest";

export interface ISignInWithGoogleUseCase extends
    IUseCase<ISignInWithGoogleRequest, UserSession> {
}