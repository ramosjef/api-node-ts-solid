import { IUseCase } from "@domain/core/interfaces/IUseCase";
import { ILoginRequest } from "./ILoginRequest";
import { ILoginResponse } from "./ILoginResponse";

export interface ILoginUseCase extends IUseCase<ILoginRequest, ILoginResponse> { }