import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeuralNetworkComponent } from './neural-network.component';
import { NeuralNetworkService } from './neural-network.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CanvasModule } from '../canvas/canvas.module';

@NgModule({
  declarations: [NeuralNetworkComponent],
  providers: [NeuralNetworkService],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CanvasModule
  ]
})
export class NeuralNetworkModule { }
