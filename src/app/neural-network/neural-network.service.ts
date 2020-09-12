import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../spinner/spinner.service';
import { GetCheckpointsResponseItem } from './neural-network.types';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NeuralNetworkService {
  private checkpoints: BehaviorSubject<GetCheckpointsResponseItem[]>;
  private selectedCheckpoint: BehaviorSubject<number>;
  private selectedModel: BehaviorSubject<number>;

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
    public dialog: MatDialog,
  ) {
    this.checkpoints = new BehaviorSubject<GetCheckpointsResponseItem[]>([]);
    this.selectedCheckpoint = new BehaviorSubject<number>(-1);
    this.selectedModel = new BehaviorSubject<number>(-1);
  }

  public openModal<T>(component: ComponentType<T>, classes: string[]) {
    this.dialog.open(component, {
      panelClass: [
        'custom-dialog',
        ...classes
      ]
    })
  }

  public closeAllModals() {
    this.dialog.closeAll();
  }

  public initCheckpoints() {
    this.spinnerService.setLoading(true);
    return this.http.get<GetCheckpointsResponseItem[]>('/api/models/checkpoints').pipe(
      finalize(() => {
        this.spinnerService.setLoading(false);
      })
    ).subscribe((data) => {
      this.checkpoints.next(data);
    });
  }

  public get getCheckpoints() {
    this.initCheckpoints();
    return this.checkpoints.asObservable();
  }

  public get getModel() {
    return this.selectedModel.asObservable();
  }

  public get getCheckpoint() {
    return this.selectedCheckpoint.asObservable();
  }

  public setSelectedModel(selectedModel: number) {
    this.selectedModel.next(selectedModel);
  }

  public setSelectedCheckpoint(selectedCheckpoint: number) {
    this.selectedCheckpoint.next(selectedCheckpoint);
  }
}
