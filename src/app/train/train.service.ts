import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NeuralNetworkService } from '../neural-network/neural-network.service';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private selectedCheckpoint: number = -1;
  private selectedModel: number = -1;

  constructor(
    private http: HttpClient,
    private neuralNetworkService: NeuralNetworkService,
  ) {
    this.neuralNetworkService.getModel.subscribe((selectedModel) => {
      this.selectedModel = selectedModel;
    });

    this.neuralNetworkService.getCheckpoint.subscribe((selectedCheckpoint) => {
      this.selectedCheckpoint = selectedCheckpoint;
    })
  }

  public train(fromCheckpoint: boolean, epochs: number) {
    return this.http.post(`/api/models/${this.selectedModel}/train`, {
      epochs,
      checkpoint_id: this.selectedCheckpoint === -1 ? null : this.selectedCheckpoint,
      fromCheckpoint: this.selectedCheckpoint !== -1 && fromCheckpoint,
    })
  }
}
