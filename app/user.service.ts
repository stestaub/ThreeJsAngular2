import {BimServerService, ServerInterface} from "./bim-server.service";
import { Injectable, Inject } from '@angular/core';
import {User} from "./user";
import {BimServerResponse} from "./bim-server-response";

@Injectable()
export class UserService {

    public loggedIn: boolean = false;
    public currentUser: User;

    constructor(@Inject(BimServerService) private bimClient:BimServerService) {
        this.currentUser = new User();
    }

    public login(username: string, password: string) {
        this.bimClient.call(ServerInterface.AuthInterface, "login",
            { "username": username, "password": password },
            (response: (BimServerResponse<string>)) => this.loginSuccess(response),
            (response: (BimServerResponse<string>)) => this.loginError(response)
        );
    }

    public loadCurrentUser() {
        this.bimClient.call(ServerInterface.AuthInterface, "getLoggedInUser", {},
            (response: (BimServerResponse<User>)) => this.extractSingle(response),
            (response) => console.error(response.error)
        );
    }

    private extractSingle(data: BimServerResponse<User>) : User {
        let user: User = data.result;
        console.log(user);
        this.setUserData(user);
        return user;
    }

    private loginSuccess(response: BimServerResponse<string>) {
        this.bimClient.token = response.result;
        this.loadCurrentUser();
        console.log(response.result);
    }

    private loginError(response: BimServerResponse<string>) {
        console.log(response.error);
    }

    private setUserData(user:User) {
        this.currentUser = user
    }
}