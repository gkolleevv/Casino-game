import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {GameComponent} from "./game.component";
import {GameRoutingModule} from "./game-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {DialogComponent} from "../dialog/dialog.component";
import {MatInputModule} from "@angular/material/input";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatMenuModule} from "@angular/material/menu";
import {HttpClientModule} from "@angular/common/http";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";

@NgModule({
  declarations: [
    GameComponent,
    DialogComponent,
    ConfirmationDialogComponent
  ],
  entryComponents: [
    DialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    MatInputModule,
    HttpClientModule,
    CommonModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    GameRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
})
export class GameModule { }
