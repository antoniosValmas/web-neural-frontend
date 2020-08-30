import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CanvasService } from './canvas.service';
import { CanvasComponent } from './canvas.component';

@NgModule({
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
  ],
  declarations: [CanvasComponent],
  providers: [CanvasService],
})
export class CanvasModule {}
