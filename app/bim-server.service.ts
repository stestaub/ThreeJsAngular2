import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { User } from './user';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {BimServerResponse} from "./bim-server-response";

export enum ServerInterface {
    AuthInterface,
    ServiceInterface
}

@Injectable()
export class BimServerService {

    protected bimServerAdress: string = "http://52.164.244.112:8080/json";
    token: string;

    constructor(protected http: Http) {
    }

    call<T>(serverInterface: ServerInterface, method: string, params: any,
            onSuccess: (response: BimServerResponse<T>) => void,
            onError: (response: BimServerResponse<T>) => void) {
        var data = {
                "request":
                {
                    "interface": ServerInterface[serverInterface],
                    "method": method,
                    "parameters": params,

                },
                "token": this.token
        };

        this.http.post(this.bimServerAdress, data).map(this.extractResponse).subscribe(
            (response) => this.handleSuccess(response, onSuccess, onError),
            (error) => this.handleError(error, onError),
            () => console.log('Call finished')
        );
    }

    // Handles 200 responses which also can contain errors
    private handleSuccess<T>(response: BimServerResponse<T>,
                             successCallback: (response: BimServerResponse<T>) => void,
                             errorCallback: (response: BimServerResponse<T>) => void) {
        if(!response.isError) {
            successCallback(response);
        } else {
            errorCallback(response);
        }
    }

    // Handles Connection errors and non 200 responses
    private handleError<T>(error, errorCallback: (response: BimServerResponse<T>) => void) {
        let _response = new BimServerResponse<T>();
        _response.isError = true;
        _response.error = error;
        errorCallback(_response);
    }

    // Extract the BimServerResponse from the response data
    private extractResponse<T>(data: Response) : BimServerResponse<T>{
        let _response = new BimServerResponse<T>();
        let jsonObject = data.json();
        if(!jsonObject.exception == null) {
            _response.isError = true;
            _response.error = jsonObject.exception;
        }
        else {
            _response.isError = false;
            _response.result = jsonObject.response.result;
            console.log(jsonObject);
        }
        return _response;
    }
}