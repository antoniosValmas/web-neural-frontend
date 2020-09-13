import { Component } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { TrainComponent } from '../train/train.component';
import { GetCheckpointsResponseItem } from './neural-network.types';
import { DialogService } from '../services/dialog.service';
import { ModelsService } from '../services/models.service';

@Component({
  selector: 'app-neural-network',
  templateUrl: './neural-network.component.html',
  styleUrls: ['./neural-network.component.scss']
})
export class NeuralNetworkComponent{
  public checkpointsPerModel: GetCheckpointsResponseItem[] = [];
  constructor(
    private modelsService: ModelsService,
    private dialogService: DialogService
  ) {
    this.modelsService.getCheckpointsPerModel.subscribe((checkpointsPerModel) => {
      this.checkpointsPerModel = checkpointsPerModel;
    })
  }

  public onSelectionChange(e: Event, modelId = -1, checkpointId = -1) {
    this.modelsService.selectedModel = modelId;
    this.modelsService.selectedCheckpoint = checkpointId;
  }

  public openTestModal() {
    this.dialogService.openModal(CanvasComponent, ['testing-dialog']);
  }

  public openTrainModal() {
    this.dialogService.openModal(TrainComponent, ['train-dialog']);
  }

}
