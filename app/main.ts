/**
 * Created by stefan on 9/16/16.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
