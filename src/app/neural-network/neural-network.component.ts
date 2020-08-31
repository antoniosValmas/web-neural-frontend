import { Component } from '@angular/core';
import { CanvasComponent } from '../canvas/canvas.component';
import { NeuralNetworkService } from './neural-network.service';

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
    this.neuralNetworkService.openModal(CanvasComponent);
  }

  public train() {
    this.neuralNetworkService.train().subscribe();
  }

}
