import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { ChartsModule } from 'ng2-charts';
import { NeuralNetworkComponent } from './neural-network.component';
import { ModelsService } from '../services/models.service';
import { DialogService } from '../services/dialog.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [NeuralNetworkComponent],
  providers: [ModelsService, DialogService],
  imports: [
    CommonModule,
    ChartsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatSelectModule
  ]
})
export class NeuralNetworkModule { }
