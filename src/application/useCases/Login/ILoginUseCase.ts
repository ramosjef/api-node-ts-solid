import { IUseCase } from "@domain/core/interfaces/IUseCase";
import { ILoginRequest } from "./ILoginRequest";
import { ILoginResponse } from "./ILoginResponse";

export type ILoginUseCase = IUseCase<ILoginRequest, ILoginResponse>