import { interfaces } from "inversify-express-utils";
import { User } from "@domain/users/User";

export class Principal implements interfaces.Principal {
    details: User;

    constructor(user: User) {
        this.details = user
    }

    isAuthenticated(): Promise<boolean> {
        const res = (this.details && this.details.id != null && this.details.id != undefined);
        return Promise.resolve(res)
    }

    isResourceOwner(resourceId: string): Promise<boolean> {
        return Promise.resolve(true)
    }

    isInRole(role: string): Promise<boolean> {
        return Promise.resolve(this.details && this.details.role === role)
    }

}