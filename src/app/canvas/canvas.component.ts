import { Component, AfterViewInit, Input } from '@angular/core';
import { fromEvent, Observable, merge } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { CanvasService } from './canvas.service';
import { NeuralNetworkService } from '../neural-network/neural-network.service';
import { StatisticsComponent } from '../statistics/statistics.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @Input() public width = 280;
  @Input() public height = 280;

  private cx: CanvasRenderingContext2D | null = null;

  constructor(
    private canvasService: CanvasService,
    private neuralNetworkService: NeuralNetworkService
  ) {}

  ngAfterViewInit(): void {
    // get the context
    const canvasEl = document.getElementById(
      'draw-canvas'
    ) as HTMLCanvasElement;

    const canvasContext = canvasEl.getContext('2d');
    if (!canvasContext) {
      console.error("Couldn't get 2d context.");
      return;
    }
    this.cx = canvasContext;

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;

    // set some default properties about the line
    this.cx.lineWidth = 15;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.clear();

    // we'll implement this method to start capturing mouse events
    this.captureEvents(canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // Initialize mouse start and touch start event observables
    const mouseDown = fromEvent<MouseEvent>(canvasEl, 'mousedown');
    const touchStart = fromEvent<TouchEvent>(canvasEl, 'touchstart')
    // this will capture all mousedown events from the canvas element
    merge(mouseDown, touchStart)
      .pipe(
        switchMap((e) => {
          // Initialize mouse start and mouse move and touch move event observables
          const mouseMove = fromEvent<MouseEvent>(canvasEl, 'mousemove');
          const touchMove = fromEvent<TouchEvent>(canvasEl, 'touchmove')
          // after a mouse down, we'll record all mouse moves
          return merge(mouseMove, touchMove).pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // stop when touch stops
            takeUntil(fromEvent(canvasEl, 'touchend')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: [MouseEvent | TouchEvent, MouseEvent | TouchEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        const positions = {
          prevPos: { x: 0, y: 0 },
          currentPos: { x: 0, y: 0 },
        }
        // previous and current position with the offset
        if (res[0] instanceof MouseEvent && res[1] instanceof MouseEvent) {
          positions.prevPos = {
            x: res[0].clientX - rect.left,
            y: res[0].clientY - rect.top,
          };

          positions.currentPos = {
            x: res[1].clientX - rect.left,
            y: res[1].clientY - rect.top,
          }
        } else if (res[0] instanceof TouchEvent && res[1] instanceof TouchEvent) {
          positions.prevPos = {
            x: res[0].touches[0].clientX - rect.left,
            y: res[0].touches[0].clientY - rect.top,
          };

          positions.currentPos = {
            x: res[1].touches[0].clientX - rect.left,
            y: res[1].touches[0].clientY - rect.top,
          };
        }

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(positions.prevPos, positions.currentPos);
      });
  }

  private drawOnCanvas(
    prevPos: { x: number; y: number },
    currentPos: { x: number; y: number }
  ) {
    // incase the context is not set
    if (!this.cx) {
      return;
    }

    // start our drawing path
    this.cx.beginPath();

    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      this.cx.moveTo(prevPos.x, prevPos.y); // from

      // draws a line from the start pos until the current position
      this.cx.lineTo(currentPos.x, currentPos.y);

      // strokes the current path with the styles we set earlier
      this.cx.stroke();
    }
  }

  // Submit image for prediction
  public submit() {
    if (!this.cx) {
      console.error('Canvas is not initialized.');
      return;
    }

    this.neuralNetworkService.closeAllModals();
    this.canvasService
      .sendImagesToPredict(this.cx.canvas.toDataURL())
      .subscribe((data) => {
        this.canvasService.setPredictions(data.predictions);
        this.canvasService.setLabels(data.labels);
        this.neuralNetworkService.openModal(StatisticsComponent, ['statistics-dialog']);
      });
  }

  // Clear canvas and image selection
  public clear() {
    if (!this.cx) {
      console.error('Canvas is not initialized.');
      return;
    }

    this.cx.clearRect(0, 0, this.width, this.height);
    this.cx.fillStyle = '#fff';
    this.cx.fillRect(0, 0, this.width, this.height);
    const inputElement = document.getElementById('file') as HTMLInputElement;
    inputElement.value = '';
  }

  // User selects a file to upload
  public onFileSelected() {
    const inputElement = document.getElementById('file') as HTMLInputElement;
    const reader = new FileReader();
    const img = new Image();

    img.onload = () => {
      if (!this.cx) {
        console.error('Canvas is not initialized.');
        return;
      }

      this.clear();
      this.cx.drawImage(img, 0, 0, 280, 280);
    };
    reader.onload = (ev) => {
      if (!ev || !ev.target) {
        console.error("Image couldn't be processed.");
        return;
      }
      img.src = ev.target.result as string;
    };
    if (!inputElement.files) {
      console.error('No files were added.');
      return;
    }
    reader.readAsDataURL(inputElement.files[0]);
  }
}
