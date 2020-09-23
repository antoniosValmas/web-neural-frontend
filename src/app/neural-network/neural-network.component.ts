import { Component, ViewChild } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Label, BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartDataSets, TickOptions } from 'chart.js';
import { CanvasComponent } from '../canvas/canvas.component';
import { TrainComponent } from '../train/train.component';
import { GetCheckpointsResponseItem, GetStatisticsResponse } from './neural-network.types';
import { DialogService } from '../services/dialog.service';
import { ModelsService } from '../services/models.service';
import { yAccuracy, yLoss } from './chart.constants';

@Component({
  selector: 'app-neural-network',
  templateUrl: './neural-network.component.html',
  styleUrls: ['./neural-network.component.scss']
})
export class NeuralNetworkComponent{
  public checkpointsPerModel: GetCheckpointsResponseItem[] = [];
  public checkpointDescription = 'No checkpoint has been selected';

  public statistics: GetStatisticsResponse = {
    evaluation_acc: 0,
    evaluation_loss: 0,
    training_acc: [],
    training_loss: []
  };

  public labels: Label[] = [];
  public trainingData: ChartDataSets[] = [
    {
      data: [],
      label: 'Accuracy (%)',
      yAxisID: 'y-accuracy',
    },
    {
      data: [],
      label: 'Loss',
      yAxisID: 'y-loss',
    },
  ]
  public chartOptions: ChartOptions = {
    aspectRatio: 2,
    scales: {
      yAxes: [yAccuracy, yLoss]
    }
  }

  @ViewChild(BaseChartDirective)
  private chart: BaseChartDirective;

  constructor(
    private modelsService: ModelsService,
    private dialogService: DialogService,
  ) {
    this.modelsService.getCheckpointsPerModel.subscribe((checkpointsPerModel) => {
      this.checkpointsPerModel = checkpointsPerModel;
    })
  }

  public onSelectionChange(e: MatOptionSelectionChange, modelId = -1, checkpointId = -1) {
    if (!e.isUserInput) {
      return;
    }

    this.modelsService.selectedModel = modelId;
    this.modelsService.selectedCheckpoint = checkpointId;
    if (modelId !== -1 && checkpointId !== -1) {
      this.setCheckpointDescription(modelId, checkpointId);
      console.log(this.checkpointDescription);
      this.modelsService.getStatistics(modelId, checkpointId).subscribe((data) => {
        this.statistics = {
          evaluation_acc: data.evaluation_acc * 100,
          evaluation_loss: data.evaluation_loss,
          training_acc: data.training_acc.map((value) => value * 100),
          training_loss: data.training_loss,
        };

        this.setChartData();
      })
    }
  }

  public openTestModal() {
    this.dialogService.openModal(CanvasComponent, ['testing-dialog']);
  }

  public openTrainModal() {
    this.dialogService.openModal(TrainComponent, ['train-dialog']);
  }

  public parseEvaluationAccuracy(evaluation_acc: number) {
    return Math.pow((evaluation_acc / 100), 10) * 100;
  }

  public parseEvaluationLoss(evaluation_loss: number) {
    return (evaluation_loss * 10) / Math.ceil(evaluation_loss * 10) * 100;
  }

  private setCheckpointDescription(modelId: number, checkpointId: number) {
    const selectedModel = this.checkpointsPerModel.find((model) => model.model_id === modelId);
    if (!selectedModel) {
      return;
    }

    const selectedCheckpoint = selectedModel.checkpoints.find((checkpoint) => checkpoint.checkpoint_id === checkpointId);
    if (!selectedCheckpoint) {
      return;
    }

    this.checkpointDescription = `${selectedCheckpoint.created_at}`;
  }

  private setChartData() {
    this.trainingData[0].data = this.statistics.training_acc;
    this.trainingData[1].data = this.statistics.training_loss;

    this.labels = this.statistics.training_acc.map((_, index) => (index + 1).toString());

    yAccuracy.ticks = this.setupChartLimits(this.statistics.training_acc);

    yLoss.ticks = this.setupChartLimits(this.statistics.training_loss);

    this.chartOptions.scales = {
      yAxes: [yAccuracy, yLoss]
    }

    this.chart.ngOnDestroy();
    this.chart.chart = this.chart.getChartBuilder(this.chart.ctx);
  }

  private setupChartLimits(data: number[]): TickOptions {
    const numberOfTicks = 5;

    const min = Math.min(...data);
    const max = Math.max(...data);
    const [ upperLimit, lowerLimit ] = this.roundLimits(max, min);
    
    return {
      max: upperLimit,
      min: lowerLimit,
      stepSize: (upperLimit - lowerLimit) / numberOfTicks,
    };
  }

  private roundLimits(upper: number, lower: number): [number, number] {
    if (upper > 10 && lower > 10) {
      const [ upperRes, lowerRes ] = this.roundLimits(upper / 10, lower / 10);
      return [ upperRes * 10, lowerRes * 10 ];
    } else if (upper < 1 && lower < 1) {
      const [ upperRes, lowerRes ] = this.roundLimits(upper * 10, lower * 10);
      return [ upperRes / 10, lowerRes / 10 ];
    } else {
      return [Math.ceil(upper), Math.floor(lower)];
    }
  }
}
