import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner.component';
import { SpinnerService } from './spinner.service';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [CommonModule, MatProgressSpinnerModule],
  providers: [SpinnerService],
  exports: [SpinnerComponent]
})
export class SpinnerModule {}
