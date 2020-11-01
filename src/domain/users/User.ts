export class User {
    public id?: string
    public readonly name?: string
    public readonly email?: string
    public readonly password?: string
    public readonly role?: string
    public readonly token?: string

    constructor(props: Omit<User, 'id'>, id?: string) {
        Object.assign(this, props)
    }
}
