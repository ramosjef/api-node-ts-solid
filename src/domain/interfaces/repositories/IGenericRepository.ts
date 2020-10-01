import { ICreate } from "../core/ICreate";
import { IFind } from "../core/IFind";
import { IRemove } from "../core/IRemove";
import { ISelect } from "../core/ISelect";
import { IUpdate } from "../core/IUpdate";

export interface IGenericRepository<TModel extends { id?: TKey }, TKey>
    extends
    ISelect<TModel>,
    IFind<TModel>,
    ICreate<TModel, TKey>,
    IUpdate<TModel>,
    IRemove<TModel> { }