import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {RouterOutlet} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {GameService} from "./game/game.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      RouterOutlet,
      HttpClientModule,
      AppRoutingModule,
      ToastrModule.forRoot({
        timeOut: 1000,
        positionClass: 'toast-bottom-right'
      }),
    ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
