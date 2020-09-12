import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from '../spinner/spinner.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
    private spinnerService: SpinnerService,
  ) {}

  public trainUserInput(imagesURL: string[], correctLabels: number[]) {
    this.spinnerService.setLoading(true);
    const body = imagesURL.map((url, index) => {
      return {
        imageURL: url,
        label: correctLabels[index],
      }
    })
    return this.http
      .post(`/api/models/4/checkpoints/1/train/user-input`, body)
      .pipe(
        finalize(() => {
          this.spinnerService.setLoading(false);
        })
      );
  }
}
