import { Component } from '@angular/core';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  public loading = false;

  constructor(
    private spinnerService: SpinnerService
  ) {
    spinnerService.loading.subscribe((loading) => {
      this.loading = loading;
    })
  }

}
