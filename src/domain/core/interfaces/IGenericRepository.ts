import { ICreate } from "./ICreate";
import { IRemove } from "./IRemove";
import { IUpdate } from "./IUpdate";

export interface IGenericRepository<T> extends
    ICreate<T, Promise<string>>,
    IUpdate<T>,
    IRemove<T> {
    Find(query: any): Promise<T>;
}