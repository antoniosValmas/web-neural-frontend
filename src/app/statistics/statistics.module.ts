import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { StatisticsService } from './statistics.service';
import { CanvasService } from '../canvas/canvas.service';



@NgModule({
  declarations: [StatisticsComponent],
  providers: [
    StatisticsService,
    CanvasService
  ],
  imports: [
    CommonModule
  ]
})
export class StatisticsModule { }
