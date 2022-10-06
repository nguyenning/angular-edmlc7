import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BehaviorSubject } from 'rxjs';
import { Vessel, VESSELS } from 'src/app/data/vessels';
import { VesselBottomsheetComponent } from '../vessel-bottomsheet/vessel-bottomsheet.component';

@Component({
  selector: 'app-vessel-results',
  templateUrl: './vessel-results.component.html',
  styleUrls: ['./vessel-results.component.scss'],
})
export class VesselResultsComponent implements OnInit {
  @Input() searchFilter: any;

  filteredVessels = new BehaviorSubject<any[]>([]);

  isBottomsheetOpen = false;

  constructor(private _bottomSheet: MatBottomSheet) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.searchFilter) {
      this.filterVessels();
    }
  }

  ngOnInit(): void {
    this.filterVessels();
  }

  filterVessels() {
    const vessels = VESSELS.sort((a, b) =>
      a.SHIPNAME < b.SHIPNAME ? -1 : 1
    ).filter(vesselFilterFn(this.searchFilter));
    this.filteredVessels.next(vessels);
  }

  onVesselSelect(vessel: any) {
    const ref = this._bottomSheet.open(VesselBottomsheetComponent, {
      hasBackdrop: false,
      data: {
        vessel,
      },
    });

    // ref.afterOpened().subscribe(() => (this.isBottomsheetOpen = true));
    // ref.afterDismissed().subscribe(() => (this.isBottomsheetOpen = false));
  }
}

function vesselFilterFn(searchFilter: any) {
  return (v: Vessel) => {
    if (searchFilter?.searchText) {
      const regExp = new RegExp(searchFilter.searchText, 'ig');
      return (
        regExp.test(v.SHIPNAME) || regExp.test(v.MMSI) || regExp.test(v.IMO)
      );
    }
    return true;
  };
}
