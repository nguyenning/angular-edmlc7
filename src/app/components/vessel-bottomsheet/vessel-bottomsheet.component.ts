import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';
import { Vessel } from 'src/app/data/vessels';

@Component({
  selector: 'app-vessel-bottomsheet',
  templateUrl: './vessel-bottomsheet.component.html',
  styleUrls: ['./vessel-bottomsheet.component.scss'],
})
export class VesselBottomsheetComponent implements OnInit {
  get vessel() {
    return this.data.vessel;
  }
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: VesselBottomsheetData,
    private bottomSheetRef: MatBottomSheetRef
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.bottomSheetRef.dismiss();
  }
}

export interface VesselBottomsheetData {
  vessel: Vessel;
}
