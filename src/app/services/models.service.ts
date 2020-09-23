import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {
  GetCheckpointsResponseItem,
  GetStatisticsResponse,
} from '../neural-network/neural-network.types';
import { SpinnerService } from './spinner.service';
import { finalize } from 'rxjs/operators';
import { PredictResponse } from '../canvas/canvas.types';

@Injectable()
export class ModelsService {
  // Model and checkpoint selected by the user
  public selectedModel = -1;
  public selectedCheckpoint = -1;

  // Response from getCheckpoints endpoint
  private checkpointsPerModel: BehaviorSubject<GetCheckpointsResponseItem[]>;

  // Information used by the statistics model
  private predictionsObservable: BehaviorSubject<number[][]>;
  private labelsObservable: BehaviorSubject<number[]>;
  private imagesURLObservable: BehaviorSubject<string[]>;

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService
  ) {
    this.checkpointsPerModel = new BehaviorSubject<
      GetCheckpointsResponseItem[]
    >([]);

    this.predictionsObservable = new BehaviorSubject<number[][]>([]);
    this.labelsObservable = new BehaviorSubject<number[]>([]);
    this.imagesURLObservable = new BehaviorSubject<string[]>([]);
  }

  /**
   * Get latests predictions fetched
   */
  public get predictions() {
    return this.predictionsObservable.asObservable();
  }

  /**
   * Get latest labels used
   */
  public get labels() {
    return this.labelsObservable.asObservable();
  }

  /**
   * Get latest images sent to predict
   */
  public get imagesURL() {
    return this.imagesURLObservable.asObservable();
  }

  /**
   * Set the predictions array
   *
   * @param predictions The predictions for each input sent
   */
  public setPredictions(predictions: number[][]) {
    return this.predictionsObservable.next(predictions);
  }

  /**
   * Set the categories, to be shown in the statistics
   *
   * @param labels An array with the labels
   */
  public setLabels(labels: number[]) {
    return this.labelsObservable.next(labels);
  }

  /**
   * Get checkpoints per model observable
   */
  public get getCheckpointsPerModel() {
    this.initCheckpointsPerModel();
    return this.checkpointsPerModel.asObservable();
  }

  /**
   * Train neural network
   * You can start training from the selected checkpoint or start over.
   *
   * @param fromCheckpoint Start training from selected checkpoint
   * @param epochs The number of epochs the training will take
   */
  public train(fromCheckpoint: boolean, epochs: number) {
    return this.http.post(`/api/models/${this.selectedModel}/train`, {
      epochs,
      checkpoint_id: fromCheckpoint && this.selectedCheckpoint,
      fromCheckpoint: fromCheckpoint,
    });
  }

  public trainUserInput(imagesURL: string[], correctLabels: number[]) {
    this.spinnerService.setLoading(true);
    const body = imagesURL.map((url, index) => {
      return {
        imageURL: url,
        label: correctLabels[index],
      };
    });
    return this.http
      .post(`/api/models/4/checkpoints/1/train/user-input`, body)
      .pipe(
        finalize(() => {
          this.spinnerService.setLoading(false);
        })
      );
  }

  /**
   * Send images to be predicted
   *
   * @param url The data url of the image
   */
  public sendImagesToPredict(url: string) {
    this.spinnerService.setLoading(true);
    this.imagesURLObservable.next([url]);
    return this.http
      .post<PredictResponse>(
        `/api/models/${this.selectedModel}/checkpoints/${this.selectedCheckpoint}/predict`,
        { url }
      )
      .pipe(
        finalize(() => {
          this.spinnerService.setLoading(false);
        })
      );
  }

  public getStatistics(model_id: number, checkpoint_id: number) {
    this.spinnerService.setLoading(true);
    return this.http
      .get<GetStatisticsResponse>(
        `/api/models/${this.selectedModel}/checkpoints/${this.selectedCheckpoint}/statistics`
      )
      .pipe(
        finalize(() => {
          this.spinnerService.setLoading(false);
        })
      );
  }

  /**
   * Get checkpoints per model
   */
  private initCheckpointsPerModel() {
    this.spinnerService.setLoading(true);
    return this.http
      .get<GetCheckpointsResponseItem[]>('/api/models/checkpoints')
      .pipe(
        finalize(() => {
          this.spinnerService.setLoading(false);
        })
      )
      .subscribe((data) => {
        this.checkpointsPerModel.next(data);
      });
  }
}
