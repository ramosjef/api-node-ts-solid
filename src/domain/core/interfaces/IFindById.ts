export interface IFindById<TReq, TRes> {
    FindById(id: TReq): TRes;
}