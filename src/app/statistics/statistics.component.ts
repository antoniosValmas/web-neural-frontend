import { Component } from '@angular/core';
import { CanvasService } from '../canvas/canvas.service';
import { ThrowStmt } from '@angular/compiler';
import { NeuralNetworkService } from '../neural-network/neural-network.service';
import { StatisticsService } from './statistics.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  public predictions: number[][] = [];
  public labels: number[] = [];
  public imagesURL: string[] = [];
  public correctLabels: number[] = [];

  constructor(
    private neuralNetworkService: NeuralNetworkService,
    private canvasService: CanvasService,
    private statisticsService: StatisticsService
  ) {
    this.initializeObservables();
  }

  private initializeObservables() {
    this.canvasService.predictions.subscribe((predictions) => {
      this.predictions = predictions;
      this.correctLabels = this.predictions.map((prediction) => {
        return prediction.reduce(
          (maxIndex, value, index) =>
            prediction[maxIndex] < value ? index : maxIndex,
          0
        );
      });
      console.log(this.correctLabels);
    });

    this.canvasService.labels.subscribe((labels) => {
      this.labels = labels;
    });

    this.canvasService.imagesURL.subscribe((url) => {
      this.imagesURL = url;
    });
  }

  public submitAnswers() {
    this.neuralNetworkService.closeAllModals();
    this.statisticsService.trainUserInput(this.imagesURL, this.correctLabels).subscribe();
  }
}
