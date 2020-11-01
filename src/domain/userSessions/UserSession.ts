import { User } from "../users/User"

export class UserSession {
    public id?: string
    public token?: string
    public expiresIn?: Date
    public userId?: string
    public createdAt?: Date

    constructor(props: Omit<UserSession, 'id'>, id?: string) {
        Object.assign(this, props)
    }
}
