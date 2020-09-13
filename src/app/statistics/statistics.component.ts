import { Component } from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { ModelsService } from '../services/models.service';

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
    private dialogService: DialogService,
    private modelsService: ModelsService
  ) {
    this.initializeObservables();
  }

  private initializeObservables() {
    this.modelsService.predictions.subscribe((predictions) => {
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

    this.modelsService.labels.subscribe((labels) => {
      this.labels = labels;
    });

    this.modelsService.imagesURL.subscribe((url) => {
      this.imagesURL = url;
    });
  }

  public submitAnswers() {
    this.dialogService.closeAllModals();
    this.modelsService.trainUserInput(this.imagesURL, this.correctLabels).subscribe();
  }
}
