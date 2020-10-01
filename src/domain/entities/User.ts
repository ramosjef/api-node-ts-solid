export class User {
    public id?: string
    public readonly name?: string
    public readonly email?: string
    public readonly picture?: string
    public readonly password?: string
    public readonly role?: string
    public readonly createdAt?: Date
    public readonly modifiedAt?: Date

    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props)
    }
}
