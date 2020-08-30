import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NeuralNetworkService {

  constructor(
    private http: HttpClient
  ) { }

  public train() {
    return this.http.post('/api/neural-network/train', {})
  }
}
