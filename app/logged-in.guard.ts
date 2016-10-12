import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(protected router: Router, private user: UserService) {}


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {

        if (state.url !== '/login' && !this.user.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}