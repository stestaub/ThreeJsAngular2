import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


export enum ServerInterface {
    AuthInterface
}

@Injectable()
export class BimclientService {

    protected bimServerAdress: string = "http://52.164.244.112:8080/json";
    token: string;

    constructor(protected http: Http) {
    }

    call(serverInterface: ServerInterface, method: string, params: any) : Observable<Response> {
        var data = {
                "request":
                {
                    "interface": ServerInterface[serverInterface],
                    "method": method,
                    "parameters": params,

                },
                "token": this.token
        };

        return this.http.post(this.bimServerAdress, data);
    }
}