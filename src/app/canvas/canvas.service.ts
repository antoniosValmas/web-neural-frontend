import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../spinner/spinner.service';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { PredictResponse } from './canvas.types';

@Injectable()
export class CanvasService {
  private predictionsObservable: BehaviorSubject<number[][]>;
  private labelsObservable: BehaviorSubject<number[]>;
  private imagesURLObservable: BehaviorSubject<string[]>;

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
  ) {
    this.predictionsObservable = new BehaviorSubject<number[][]>([]);
    this.labelsObservable = new BehaviorSubject<number[]>([]);
    this.imagesURLObservable = new BehaviorSubject<string[]>([]);
  }

  // Send images to backend to predict the numbers
  sendImagesToPredict(url: string) {
    this.spinnerService.setLoading(true);
    this.imagesURLObservable.next([url]);
    return this.http
      .post<PredictResponse>(`/api/models/4/predict`, { url })
      .pipe(
        finalize(() => {
          this.spinnerService.setLoading(false);
        })
      );
  }

  public get predictions() {
    return this.predictionsObservable.asObservable();
  }

  public get labels() {
    return this.labelsObservable.asObservable();
  }

  public get imagesURL() {
    return this.imagesURLObservable.asObservable();
  }

  public setPredictions(predictions: number[][]) {
    return this.predictionsObservable.next(predictions);
  }

  public setLabels(labels: number[]) {
    return this.labelsObservable.next(labels);
  }
}
