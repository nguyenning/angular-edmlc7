import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewPlanDialogComponent } from '../new-plan-dialog/new-plan-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class NewPlanService {
  constructor(private dialog: MatDialog) {}

  open() {
    this.dialog.open(NewPlanDialogComponent);
  }
}
