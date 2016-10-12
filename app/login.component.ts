/**
 * Created by stefan on 9/16/16.
 */
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import {UserService} from "./user.service";

@Component({
    selector: 'login-component',
    template: `
    <h4>Login</h4>
    <button (click)="login()">Login</button>
    <span>Current User: {{userService.currentUser.name}}</span>
  `
})
export class LoginComponent {

    constructor(private userService: UserService, private router: Router) {
    }

    public login() {
        this.userService.login("stefan.staub@pta.ch", "password");
    }

}