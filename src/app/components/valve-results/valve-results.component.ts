import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { BehaviorSubject } from 'rxjs';
import { Valve, VALVES } from 'src/app/data/valves';
import { ValveDialogComponent } from 'src/app/valve-dialog/valve-dialog.component';

@Component({
  selector: 'app-valve-results',
  templateUrl: './valve-results.component.html',
  styleUrls: ['./valve-results.component.scss'],
})
export class ValveResultsComponent implements OnInit {
  @Input() valves: Valve[];
  @Input() selectedItem: Valve;

  @Output() selectionChange = new EventEmitter<MatSelectionListChange>();
  @Output() valveSelect = new EventEmitter<Valve>();

  @ViewChild(MatSelectionList) list: MatSelectionList;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  focusSelected() {
    this.list.selectedOptions.selected[0]?.focus();
  }
}
