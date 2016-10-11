/**
 * Created by stefan on 9/16/16.
 */
import { Component, Input, OnInit } from '@angular/core';
import {ProjectLoaderService} from "./project-loader.service";
import {UserService} from "../user.service";


@Component({
    selector: 'projects',
    providers: [ProjectLoaderService],
    template: `
    <h4>Projects</h4>
    <button (click)="getProjects()">Load Projects for {{userService.currentUser.oid}}</button>
  `
})
export class ProjectListComponent {

    constructor(private projectLoader: ProjectLoaderService, private userService: UserService) {
    }

    public getProjects() {
        this.projectLoader.getProjectsByUser(this.userService.currentUser);
    }

}