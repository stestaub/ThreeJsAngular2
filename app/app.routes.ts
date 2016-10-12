// app.routes.ts
import { LoginComponent } from './login.component';
import {ModelViewerComponent} from "./Viewer/model-viewer.component";
import {LoggedInGuard} from "./logged-in.guard";
import {ProjectListComponent} from "./Project/project-list.component";

export const routes = [
    { path: 'viewer', component: ModelViewerComponent, pathMatch: 'full', canActivate: [LoggedInGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', component: ProjectListComponent, canActivate: [LoggedInGuard] }
];