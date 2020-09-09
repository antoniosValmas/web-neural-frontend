import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class NeuralNetworkService {

  constructor(
    public dialog: MatDialog
  ) { }

  public openModal<T>(component: ComponentType<T>, classes: string[]) {
    this.dialog.open(component, {
      panelClass: [
        'custom-dialog',
        ...classes
      ]
    })
  }

  public closeAllModals() {
    this.dialog.closeAll();
  }

}
