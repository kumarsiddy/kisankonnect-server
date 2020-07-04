import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from "@nestjs/core";
import {Role} from "./role";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector) {
    }

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const allowedRoles = this.reflector.get<Role[]>('roles', context.getHandler());
        if (!allowedRoles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const hasAuthorization = () => user.roles.some((role) => allowedRoles.includes(role));
        return user && user.roles && hasAuthorization();
    }
}