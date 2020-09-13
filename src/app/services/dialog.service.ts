import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import { MatDialog } from '@angular/material/dialog';

@Injectable()
export class DialogService {
  constructor(
    public dialog: MatDialog,
  ) {}

  /**
   * Open a new modal of ComponentType<T> with custom classes
   *
   * @param component The component type
   * @param classes Extra custom css classes
   */
  public openModal<T>(component: ComponentType<T>, classes: string[] = []) {
    this.dialog.open(component, {
      panelClass: [
        'custom-dialog',
        ...classes
      ]
    })
  }

  /**
   * Close all active modals
   */
  public closeAllModals() {
    this.dialog.closeAll();
  }
}
