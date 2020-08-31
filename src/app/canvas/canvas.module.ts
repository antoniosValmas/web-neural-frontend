import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CanvasService } from './canvas.service';
import { CanvasComponent } from './canvas.component';
import { SpinnerService } from '../spinner/spinner.service';
import { NeuralNetworkService } from '../neural-network/neural-network.service';
import { StatisticsService } from '../statistics/statistics.service';

@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
  ],
  declarations: [CanvasComponent],
  providers: [CanvasService, SpinnerService, NeuralNetworkService],
})
export class CanvasModule {}
