import { IUseCase } from "../../../domain/interfaces/core/IUseCase";
import { ISignInRequest } from "./ISignInRequest";

export interface ISignInUseCase extends IUseCase<ISignInRequest, void> { }
