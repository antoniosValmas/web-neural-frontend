import { Component } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { NeuralNetworkService } from './neural-network.service';
import { TrainComponent } from '../train/train.component';
import { GetCheckpointsResponseItem } from './neural-network.types';

@Component({
  selector: 'app-neural-network',
  templateUrl: './neural-network.component.html',
  styleUrls: ['./neural-network.component.scss']
})
export class NeuralNetworkComponent{
  public checkpoints: GetCheckpointsResponseItem[] = [];
  constructor(
    private neuralNetworkService: NeuralNetworkService
  ) {
    this.neuralNetworkService.getCheckpoints.subscribe((checkpoints) => {
      this.checkpoints = checkpoints;
    })
  }

  public onSelectionChange(e: Event, model_id = -1, checkpoint_id = -1) {
    this.neuralNetworkService.setSelectedModel(model_id);
    this.neuralNetworkService.setSelectedCheckpoint(checkpoint_id);
  }

  public openTestModal() {
    this.neuralNetworkService.openModal(CanvasComponent, ['testing-dialog']);
  }

  public openTrainModal() {
    this.neuralNetworkService.openModal(TrainComponent, ['train-dialog']);
  }

}
