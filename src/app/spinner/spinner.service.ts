import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  
  private loadingObservable: BehaviorSubject<boolean>;

  constructor() {
    this.loadingObservable = new BehaviorSubject<boolean>(false);
  }

  public setLoading(loading: boolean) {
    this.loadingObservable.next(loading);
  }

  public getLoading() {
    return this.loadingObservable;
  }
}
