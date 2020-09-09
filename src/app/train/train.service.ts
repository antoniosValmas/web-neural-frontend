import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TrainService {

  constructor(
    private http: HttpClient
  ) { }

  public train(fromCheckpoint: boolean, epochs: number) {
    return this.http.post('/api/neural-network/train', {
      fromCheckpoint,
      epochs,
    })
  }
}
