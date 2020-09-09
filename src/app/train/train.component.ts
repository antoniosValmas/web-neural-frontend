import { Component } from '@angular/core';
import { TrainService } from './train.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent {
  public fromCheckpoint = true;
  public epochs = 5;

  constructor(
    public trainService: TrainService,
  ) { }

  public submit() {
    this.trainService.train(
      this.fromCheckpoint,
      this.epochs,
    ).subscribe();
  }
}
