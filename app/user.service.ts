import {BimclientService, ServerInterface} from "./bimclient.service";
import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {User} from "./user";

@Injectable()
export class UserService {

    public loggedIn: boolean = false;
    public currentUser: User;

    constructor(@Inject(BimclientService) private bimClient:BimclientService) {
    }

    public login(username: string, password: string) {
        let response: Observable<Response>= this.bimClient.call(ServerInterface.AuthInterface, "login", { "username": username, "password": password });
        response.map(this.extractData).subscribe(
            (user) => this.loginSuccess(user),
            this.loginError,
            () => console.log('Call finished')
        );
    }

    private extractData(data: Response) {
        let token = data.json().response.result;
        let user = new User();
        user.token = token;
        return user;
    }

    private loginSuccess(user) {
        this.currentUser = user;
        this.bimClient.token = user.token;
        console.log(user.token)
    }

    private loginError(error) {
        console.log(error)
    }
}