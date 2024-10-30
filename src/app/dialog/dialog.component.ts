import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GameService} from "../game/game.service";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls:['dialog.component.scss']
})
export class DialogComponent implements OnInit{
  form: FormGroup = {} as FormGroup;
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private formBuilder: FormBuilder,
    private gameService: GameService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  onCloseDialog(): void {
    this.dialogRef.close(null);
  }

  save(form: FormGroup) {
    this.dialogRef.close(form.value);
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      addMoney: new FormControl<number | null>(null),
      withdrawMoney: new FormControl<number | null>(null, [Validators.max(this.gameService.budget)]),
    }, {
      validators: [
      ]
    });
  }
}

