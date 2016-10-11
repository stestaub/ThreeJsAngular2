/**
 * Created by stefan on 9/16/16.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ViewerComponent } from "./viewer.component";
import {RenderService} from "./render.service";
import {SceneService} from "./scene.service";
import {UserService} from "./user.service";

@Component({
    selector: 'login-component',
    providers: [UserService],
    template: `
    <h4>Login</h4>
    <button (click)="login()">Login</button>
    <span>Current User: {{userService.currentUser.name}}</span>
  `
})
export class LoginComponent {

    constructor(private userService: UserService) {
    }

    public login() {
        this.userService.login("stefan.staub@pta.ch", "password");
    }

}