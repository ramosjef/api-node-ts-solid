import { IUseCase } from "@domain/core/interfaces/IUseCase";
import { ISignInRequest } from "./ISignInRequest";

export type ISignInUseCase = IUseCase<ISignInRequest, void>
