export interface IUpdate<TReq> {
    Update(entity: TReq): Promise<void>
}