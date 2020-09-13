import { Component } from '@angular/core';
import { ModelsService } from '../services/models.service';

@Component({
  selector: 'app-train',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.scss']
})
export class TrainComponent {
  public fromCheckpoint = true;
  public epochs = 5;

  constructor(
    public modelsService: ModelsService,
  ) { }

  public submit() {
    this.modelsService.train(
      this.fromCheckpoint,
      this.epochs,
    ).subscribe();
  }
}
