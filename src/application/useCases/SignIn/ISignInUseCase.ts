import { IUseCase } from "@domain/core/interfaces/IUseCase";
import { ISignInRequest } from "./ISignInRequest";

export interface ISignInUseCase extends IUseCase<ISignInRequest, void> { }
