import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mainfold } from '../data/manifolds';
import { Valve, ValveChangeHistory } from '../data/valves';

export interface ValveChangeDialogData {
  asset: Mainfold;
  valve: Valve;
  history?: ValveChangeHistory;
}

@Component({
  selector: 'app-valve-change-dialog',
  templateUrl: './valve-change-dialog.component.html',
  styleUrls: ['./valve-change-dialog.component.scss'],
})
export class ValveChangeDialogComponent implements OnInit {
  get isNew() {
    return !this.data.history;
  }

  get asset(): Mainfold {
    return this.data.asset;
  }

  get valve(): Valve {
    return this.data.valve;
  }

  static config: MatDialogConfig = {
    minWidth: '600px',
    disableClose: true,
    panelClass: 'app-valve-change-dialog-panel',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: ValveChangeDialogData) {}

  ngOnInit(): void {}
}
