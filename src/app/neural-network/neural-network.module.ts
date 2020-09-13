import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'
import { NeuralNetworkComponent } from './neural-network.component';
import { ModelsService } from '../services/models.service';
import { DialogService } from '../services/dialog.service';

@NgModule({
  declarations: [NeuralNetworkComponent],
  providers: [ModelsService, DialogService],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule
  ]
})
export class NeuralNetworkModule { }
