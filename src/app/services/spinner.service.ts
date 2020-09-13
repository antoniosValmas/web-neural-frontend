import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SpinnerService {
  
  private loadingObservable: BehaviorSubject<boolean>;

  constructor() {
    this.loadingObservable = new BehaviorSubject<boolean>(false);
  }

  /**
   * Set loading state
   *
   * @param loading The value of the loading state
   */
  public setLoading(loading: boolean) {
    this.loadingObservable.next(loading);
  }

  /**
   * Get the loading state
   */
  public get loading() {
    return this.loadingObservable.asObservable();
  }
}
