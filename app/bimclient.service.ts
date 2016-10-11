import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BimclientService {

    private bimServerAdress: string = "http://52.164.244.112:8080/json";

    constructor(private http: Http) {
    }

    public login(username: string, password: string) {
        var data = {
            "request":
                {
                    "interface":"AuthInterface",
                    "method":"login",
                    "parameters":
                        {
                            "username": username,
                            "password": password
                        }
                }
        };

        let response: Observable<Response> = this.http.post(this.bimServerAdress, data);
        response.map(res => res.json().response.result)
            .subscribe(
                data => console.log(data),
                err => console.error(err),
                () => console.log('call completed'));
    }



}