import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise, finalize } from 'rxjs/operators';
import { CanvasService } from './canvas.service';
import { SpinnerService } from '../spinner/spinner.service';
import { NeuralNetworkService } from '../neural-network/neural-network.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements AfterViewInit {
  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 280;
  @Input() public height = 280;

  private cx: CanvasRenderingContext2D;
  public result: number;

  constructor(
    private canvasService: CanvasService,
    private spinnerService: SpinnerService,
    private neuralNetworkService: NeuralNetworkService
  ) {}

  ngAfterViewInit(): void {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.cx = canvasEl.getContext('2d');

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
    // this will capture all mousedown events from the canvas element
    fromEvent(canvasEl, 'mousedown')
      .pipe(
        switchMap((e) => {
          // after a mouse down, we'll record all mouse moves
          return fromEvent(canvasEl, 'mousemove').pipe(
            // we'll stop (and unsubscribe) once the user releases the mouse
            // this will trigger a 'mouseup' event
            takeUntil(fromEvent(canvasEl, 'mouseup')),
            // we'll also stop (and unsubscribe) once the mouse leaves the canvas (mouseleave event)
            takeUntil(fromEvent(canvasEl, 'mouseleave')),
            // pairwise lets us get the previous value to draw a line from
            // the previous point to the current point
            pairwise()
          );
        })
      )
      .subscribe((res: [MouseEvent, MouseEvent]) => {
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top,
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top,
        };

        // this method we'll implement soon to do the actual drawing
        this.drawOnCanvas(prevPos, currentPos);
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
    this.neuralNetworkService.closeTestModal();
    this.spinnerService.setLoading(true);
    this.canvasService
      .sendImagesToPredict(this.cx.canvas.toDataURL())
      .pipe(
        finalize(() => {
          this.spinnerService.setLoading(false);
        })
      )
      .subscribe((data) => {
        this.result = data['labels'][0];
      });
  }

  // Clear canvas and image selection
  public clear() {
    this.cx.clearRect(0, 0, this.width, this.height);
    this.cx.fillStyle = '#fff';
    this.cx.fillRect(0, 0, this.width, this.height);
  }

  // User selects a file to upload
  public onFileSelected() {
    const inputElement = document.getElementById('file') as HTMLInputElement;
    const reader = new FileReader();
    const img = new Image();

    img.onload = () => {
      this.clear();
      this.cx.drawImage(img, 0, 0, 280, 280);
    };
    reader.onload = (ev) => {
      img.src = ev.target.result as string;
    };
    reader.readAsDataURL(inputElement.files[0]);
  }
}
