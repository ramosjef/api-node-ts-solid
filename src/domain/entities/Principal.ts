import { interfaces } from "inversify-express-utils";
import { User } from "./User";

export class Principal implements interfaces.Principal {
    details: User;

    constructor(user: User) {
        this.details = user
    }

    isAuthenticated(): Promise<boolean> {
        let res: boolean = this.details && this.details.id != "";
        return Promise.resolve(res)
    }

    isResourceOwner(resourceId: any): Promise<boolean> {
        return Promise.resolve(true)
    }

    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(this.details && this.details.role === role)
    }

}