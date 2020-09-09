import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainComponent } from './train.component';
import { TrainService } from './train.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TrainComponent
  ],
  providers: [
    TrainService
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule
  ]
})
export class TrainModule { }
