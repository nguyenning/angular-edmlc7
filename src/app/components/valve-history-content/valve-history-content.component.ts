import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Mainfold } from 'src/app/data/manifolds';
import { Valve, ValveChangeHistory } from 'src/app/data/valves';
import { ValveChangeDialogComponent } from 'src/app/valve-change-dialog/valve-change-dialog.component';

export interface ValveHistoryContentData {
  asset: Mainfold;
  valve: Valve;
}

@Component({
  selector: 'app-valve-history-content',
  templateUrl: './valve-history-content.component.html',
  styleUrls: ['./valve-history-content.component.scss'],
})
export class ValveHistoryContentComponent implements OnInit {
  @Input() valveChangeHistories: any[];
  @Input() asset: Mainfold;

  @Output() addValveManoeuver = new EventEmitter<void>();
  @Output() editValveManoeuver = new EventEmitter<ValveChangeHistory>();

  clickedRows = new Set<any>();

  displayedColumns: string[] = [
    'date',
    'approved',
    'type',
    'status',
    'comments',
    'docs',
    'createdBy',
  ];

  get selectedHistory(): ValveChangeHistory | null {
    if (this.clickedRows.size) {
      return this.clickedRows.values().next().value;
    }
    return null;
  }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onRowClick(row: any) {
    if (this.clickedRows.has(row)) {
      this.clickedRows.delete(row);
    } else {
      this.clickedRows.clear();
      this.clickedRows.add(row);
    }
  }
}
