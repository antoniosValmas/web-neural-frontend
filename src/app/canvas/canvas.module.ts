import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CanvasComponent } from './canvas.component';
import { SpinnerService } from '../services/spinner.service';
import { MatDialogModule } from '@angular/material/dialog';
import { ModelsService } from '../services/models.service';

@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  declarations: [CanvasComponent],
  providers: [SpinnerService, ModelsService],
})
export class CanvasModule {}
