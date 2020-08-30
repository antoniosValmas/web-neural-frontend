import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CanvasService {
  constructor(private http: HttpClient) {}

  // Since image is in grey scale.
  // We should grey scale the image and then subtract brightness from the alpha value
  downSampleImage(imageData: Uint8ClampedArray): number {
    return (
      imageData.reduce((sum, val, index) => {
        switch (index % 4) {
          case 0:
            return sum - 0.34 * val;
          case 1:
            return sum - 0.5 * val;
          case 2:
            return sum - 0.16 * val;
          case 3:
            return sum + val;
        }
      }) / (imageData.length / 4)
    );
  }

  // Send images to backend to predict the numbers
  sendImagesToPredict(url: string) {
    return this.http.post(`/api/neural-network/predict`, { url });
  }
}
