import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Mainfold } from '../data/manifolds';
import { Valve, ValveChangeHistory } from '../data/valves';
import {
  ValveChangeDialogComponent,
  ValveChangeDialogData,
} from '../valve-change-dialog/valve-change-dialog.component';

export interface ValveDialogData {
  valve: Valve;
  asset: Mainfold;
}

@Component({
  selector: 'app-valve-dialog',
  templateUrl: './valve-dialog.component.html',
  styleUrls: ['./valve-dialog.component.scss'],
})
export class ValveDialogComponent implements OnInit {
  tabIndex = 2; // history

  static defaultConfig: MatDialogConfig = {
    width: '800px',
    minHeight: '400px',
  };

  get valve() {
    return this.data.valve;
  }

  get asset() {
    return this.data.asset;
  }

  comments: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ValveDialogData,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.comments = this.data.valve.comments.slice().sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    });
  }

  onAddManouever() {
    this.openValveChangeDialog({
      asset: this.asset,
      valve: this.valve,
    });
  }

  onEditManouever(history: ValveChangeHistory) {
    this.openValveChangeDialog({
      asset: this.asset,
      valve: this.valve,
      history: history,
    });
  }

  openValveChangeDialog(data: ValveChangeDialogData) {
    this.dialog.open(ValveChangeDialogComponent, {
      ...ValveChangeDialogComponent.config,
      data: data,
    });
  }
}
