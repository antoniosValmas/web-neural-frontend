import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NeuralNetworkComponent } from './neural-network.component';
import { NeuralNetworkService } from './neural-network.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [NeuralNetworkComponent],
  providers: [NeuralNetworkService],
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
