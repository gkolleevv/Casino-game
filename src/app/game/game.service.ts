import {Injectable} from "@angular/core";
import {BehaviorSubject, catchError, Observable, of, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";

export interface GameSymbol {
  star: string;
  dollar: string;
  dot: string;
  percentage: string;
  upper: string
}

export interface Bets {
  totalBets: number;
  winningBets: number;
  loosingBets: number;
}

export interface GetAllData {
  symbolElements: any;
  budget: number;
  bets: Bets;
}

export interface GetWalletData {
  budget: number;
  bets: Bets;
  currentBet: number;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  budget = 0;
  bets: Bets = {
    totalBets: 0,
    winningBets: 0,
    loosingBets: 0
  };
  API_URL = 'api';

  constructor(private http: HttpClient, private toaster: ToastrService) {
  }

  getSymbols(): Observable<GetAllData> {
    return this.http.get<GetAllData>(`${this.API_URL}/game`);
  }

  updateCurrentBet(bet: number) {
    // @ts-ignore
    return this.http.patch(`${this.API_URL}/wallet`, {bet}).pipe(tap(x => {
        if (x) {
          return of(this.toaster.success('The bet is updated', 'SUCCESS'))
        }
      }),
      catchError(err => {
        return of(this.toaster.error('The bet is not updated', 'ERROR'))
      }));
  }

  getWalletData(): any {
    // @ts-ignore
    return this.http.get<GetWalletData>(`${this.API_URL}/wallet`).pipe(tap(x => {
      if (x) {
        return of(this.toaster.success('The data is loaded!', 'SUCCESS', {
          timeOut: 1000
        }))
      }
    }),
      catchError(err => {
        return of(this.toaster.error('The data is not fetched!', 'ERROR', {
          timeOut: 1000
        }))
      }));
  }

  addMoney(money: number) {
    // @ts-ignore
    return this.http.post(`${this.API_URL}/wallet/deposit`, {money}).pipe(tap(x => {
        if (x) {
          return of(this.toaster.success('Added money successfully!', 'SUCCESS', {
            timeOut: 1000
          }))
        }
      }),
      catchError(err => {
        return of(this.toaster.error('Error with added money!', 'ERROR', {
          timeOut: 1000
        }))
      }));;
  }

  withdrawMoney(money: number) {
    // @ts-ignore
    return this.http.post(`${this.API_URL}/wallet/withdrawn`, {money}).pipe(tap(x => {
        if (x) {
          return this.toaster.success('Successful withdraw!', 'Success', {
            timeOut: 1000
          })
        }
      }),
      catchError(err => {
        return of(this.toaster.error('Error withdraw!', 'ERROR', {
          timeOut: 1000
        }))
      }));
  }
}
