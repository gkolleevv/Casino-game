import {Component, inject, OnDestroy, OnInit} from "@angular/core";
import {GameService, GetWalletData} from "./game.service";
import {FormControl} from "@angular/forms";
import {debounceTime, Subject, takeUntil} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";
import {ConfirmationDialogComponent} from "../confirmation-dialog/confirmation-dialog.component";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {
  elements = [
    ['*','^','$'],
    ['*','$','^'],
    ['^','$','*']
  ];
  gameService = inject(GameService);
  firstTime = true;
  dialog = inject(MatDialog);
  toaster = inject(ToastrService);
  selectedBet = new FormControl(1);
  destroy$ = new Subject();
  ngOnInit(): void {
    this.getWalletData();
    this.selectedBet.valueChanges.pipe(debounceTime(500), takeUntil(this.destroy$)).subscribe(x => {
      if (this.firstTime) {
        this.firstTime = false;
        return;
      }
      this.openConfirmDialogDialog(x as any);
    })
  }

  loadSymbols(): void {
      this.gameService.getSymbols().pipe(takeUntil(this.destroy$)).subscribe(data => {
        if (!data) {
          return;
        }
        this.elements = data.symbolElements;
        this.gameService.budget = data.budget;
        this.gameService.bets = data.bets;
      });
  }

  ngOnDestroy() {
    this.destroy$.next(null);
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '400px',
      data: this.gameService.budget
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      if (result.addMoney && result.addMoney > 0) {
        this.gameService.addMoney(result.addMoney).subscribe();
        this.gameService.budget = this.gameService.budget + result.addMoney;
      }
      if (result.withdrawMoney && result.withdrawMoney > 0) {
        this.gameService.withdrawMoney(result.withdrawMoney).subscribe();
        this.gameService.budget = this.gameService.budget - result.withdrawMoney;
      }
    });
  }

  openConfirmDialogDialog(value: number) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      data: value
    }).afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.gameService.updateCurrentBet(value).pipe(takeUntil(this.destroy$)).subscribe();
    });
  }

  private getWalletData() {
    this.gameService.getWalletData().pipe(takeUntil(this.destroy$)).subscribe((data: GetWalletData) => {
      if (!data) {
        return;
      }
      this.gameService.budget = data.budget;
      if (this.gameService.bets.winningBets < data.bets.winningBets) {
        this.toaster.success('WINNNNN!', 'SUCCESS', {
          timeOut: 1000
        });
      }
      this.gameService.bets = data.bets;
      this.selectedBet.setValue(data.currentBet);
    });
  }
}
