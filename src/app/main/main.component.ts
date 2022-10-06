import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResizeEvent } from 'angular-resizable-element';
import { NewPlanService } from '../services/new-plan.service';
import {
  SimopsDialogComponent,
  SimopsDialogData,
} from '../simops-dialog/simops-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  providers: [NewPlanService],
})
export class MainComponent implements OnInit {
  leftSidenavOpened = true;
  rightSidenavOpened = true;

  constructor(private dialog: MatDialog, private planSvc: NewPlanService) {}

  ngOnInit(): void {}

  toggleMatSidenav(): void {
    this.leftSidenavOpened = !this.leftSidenavOpened;
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
  }

  onNewPlan() {
    this.planSvc.open();
  }

  onSimOpsClick() {
    this.openSimops({
      statuses: [],
    });
  }

  onSimopsDraftClick() {
    this.openSimops({
      statuses: ['DRAFT'],
      myPlans: true,
    });
  }

  onSimopsPendingClick() {
    this.openSimops({
      statuses: ['PENDING_APPROVAL'],
    });
  }

  private openSimops(data: SimopsDialogData = {}) {
    this.dialog.open(SimopsDialogComponent, {
      ...SimopsDialogComponent.dialogOptions,
      data,
    });
  }
}
