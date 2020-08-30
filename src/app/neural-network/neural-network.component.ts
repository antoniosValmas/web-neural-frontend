import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanvasComponent } from '../canvas/canvas.component';
import { NeuralNetworkService } from './neural-network.service';

@Component({
  selector: 'app-neural-network',
  templateUrl: './neural-network.component.html',
  styleUrls: ['./neural-network.component.scss']
})
export class NeuralNetworkComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private neuralNetworkService: NeuralNetworkService
  ) { }

  ngOnInit(): void {
  }

  public openTestModal() {
    this.dialog.open(CanvasComponent, {
      width: '400px',
      maxHeight: '500px',
    })
  }

  public train() {
    this.neuralNetworkService.train().subscribe((data) => {
      console.log(data);
    })
  }

}
