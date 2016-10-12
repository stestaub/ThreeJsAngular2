/**
 * Created by stefan on 9/16/16.
 */
import { Component } from '@angular/core';
import {BimServerService} from "./bim-server.service";
import {UserService} from "./user.service";
import {LoggedInGuard} from "./logged-in.guard";

@Component({
  selector: 'three-app',
  template: `
  <h1>Angular Three Js Demo</h1>
  <nav>
    <a routerLink="/" routerLinkActive="active" *ngIf="userService.isLoggedIn()">Projects</a>
    <a routerLink="/viewer" routerLinkActive="active" *ngIf="userService.isLoggedIn()">Viewer</a>
  </nav>
  <router-outlet></router-outlet>
  `,
  providers: []
})
export class AppComponent {

  constructor(private userService: UserService) {
  }

}