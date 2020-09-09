import { Component } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { NeuralNetworkService } from './neural-network.service';
import { TrainComponent } from '../train/train.component';

@Component({
  selector: 'app-neural-network',
  templateUrl: './neural-network.component.html',
  styleUrls: ['./neural-network.component.scss']
})
export class NeuralNetworkComponent{

  constructor(
    private neuralNetworkService: NeuralNetworkService
  ) { }

  public openTestModal() {
    this.neuralNetworkService.openModal(CanvasComponent, ['testing-dialog']);
  }

  public openTrainModal() {
    this.neuralNetworkService.openModal(TrainComponent, ['train-dialog']);
  }

}
