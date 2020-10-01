import { IUseCase } from "../../../domain/interfaces/core/IUseCase";
import { User } from "../../../domain/entities/User";

export interface IGetUserByTokenUseCase extends IUseCase<string, User> { }