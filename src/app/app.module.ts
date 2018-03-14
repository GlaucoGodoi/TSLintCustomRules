import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { CoreModule } from '@core/core.module';
import { UserModule } from '@featureModules/user/user.module';


@NgModule({
  declarations: [
    AppComponent,
    UserModule
  ],
  imports: [
    BrowserModule,
    CoreModule,
    UserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
