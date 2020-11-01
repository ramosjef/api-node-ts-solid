export interface IRemove<TReq> {
    Remove(entity: TReq): Promise<void>
}