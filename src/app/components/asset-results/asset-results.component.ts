import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { Mainfold } from 'src/app/data/manifolds';

@Component({
  selector: 'app-asset-results',
  templateUrl: './asset-results.component.html',
  styleUrls: ['./asset-results.component.scss'],
})
export class AssetResultsComponent implements OnInit {
  @Input() assets!: Mainfold[];
  @Input() selectedItem: Mainfold;

  @Output() selectionChange = new EventEmitter<MatSelectionListChange>();

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  onSelect(asset: any) {}
}
