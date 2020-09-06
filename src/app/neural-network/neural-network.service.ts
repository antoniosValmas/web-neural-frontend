import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, DialogPosition } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable()
export class NeuralNetworkService {

  constructor(
    public dialog: MatDialog,
    private http: HttpClient
  ) { }

  public train() {
    return this.http.post('/api/neural-network/train', {})
  }

  public openModal<T>(component: ComponentType<T>) {
    this.dialog.open(component, {
      panelClass: 'custom-dialog'
    })
  }

  public closeAllModals() {
    this.dialog.closeAll();
  }

}
