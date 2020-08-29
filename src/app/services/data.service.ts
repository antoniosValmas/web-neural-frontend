import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}

  sendImageToPredict(images: number[][][]) {
    return this.http
      .post(`/api/neural-network/predict`, { tests: images });
  }
}
