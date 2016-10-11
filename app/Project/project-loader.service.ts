import {BimServerService, ServerInterface} from "../bim-server.service";
import { Injectable, Inject } from '@angular/core';
import {User} from "../user";
import {BimServerResponse} from "../bim-server-response";
import {Project} from "./project";

@Injectable()
export class ProjectLoaderService {

    constructor(@Inject(BimServerService) private bimClient:BimServerService) {
    }

    public getProjectsByUser(user: User) {
        this.bimClient.call(ServerInterface.ServiceInterface, "getUsersProjects",
            { "uoid": user.oid },
            (response: (BimServerResponse<Project[]>)) => this.success(response),
            (response: (BimServerResponse<Project[]>)) => this.error(response)
        );
    }

    private success(response:BimServerResponse<Project[]>):any {
        console.log(response.result);
    }

    private error(response:BimServerResponse<Project[]>):any {
        console.log(response.result);
    }
}