import { Component } from '@angular/core';
import { CanvasService } from '../canvas/canvas.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent {
  public predictions: number[][] = [];
  public labels: number[] = [];
  public imagesURL: string[] = [];

  constructor(private canvasService: CanvasService) {
    this.initializeObservables();
  }

  private initializeObservables() {
    this.canvasService.predictions.subscribe((predictions) => {
      this.predictions = predictions;
    });

    this.canvasService.labels.subscribe((labels) => {
      this.labels = labels;
    });

    this.canvasService.imagesURL.subscribe((url) => {
      this.imagesURL = url;
    });
  }
}
