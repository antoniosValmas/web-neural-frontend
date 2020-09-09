import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
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
    CommonModule,
    MatDialogModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class StatisticsModule { }
