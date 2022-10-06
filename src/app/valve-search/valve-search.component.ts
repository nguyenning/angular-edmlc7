import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ValveResultsComponent } from '../components/valve-results/valve-results.component';
import { Mainfold, MANIFOLDS } from '../data/manifolds';
import { Valve, VALVES } from '../data/valves';
import {
  ValveDialogComponent,
  ValveDialogData,
} from '../valve-dialog/valve-dialog.component';

@Component({
  selector: 'app-valve-search',
  templateUrl: './valve-search.component.html',
  styleUrls: ['./valve-search.component.scss'],
})
export class ValveSearchComponent implements OnInit {
  isFilterExpanded = true;

  searchForm: FormGroup;

  searchFilter: any;

  hasSelection = false;
  isSelecting = false;

  manifolds$ = new BehaviorSubject(MANIFOLDS);

  assets$ = new BehaviorSubject<Mainfold[]>([]);
  valves$ = new BehaviorSubject<Valve[]>([]);

  selectedAsset: Mainfold;
  selectedValve: Valve;

  @ViewChild(ValveResultsComponent) valveResults: ValveResultsComponent;

  constructor(private router: Router, private dialog: MatDialog) {
    this.searchForm = new FormGroup({
      searchText: new FormControl(),
    });
  }

  ngOnInit(): void {}

  onFilterExpansionToggle(isExpanded: boolean) {
    this.isFilterExpanded = isExpanded;
  }

  onSearch() {
    this.isFilterExpanded = false;
    this.searchFilter = { ...this.searchForm.value };

    /**
     * searches parent asset to include
     */
    const valves = this.valvesSearchFn(VALVES);
    const assets = MANIFOLDS.filter((m) => {
      const ids = valves.map((v) => v.manifoldId);
      return ids.includes(m.id);
    });

    this.selectedAsset = assets[0];

    this.assets$.next(assets);

    let valvesList: Valve[] = [];
    if (this.selectedAsset) {
      valvesList = VALVES.filter((v) => v.manifoldId == this.selectedAsset.id);
    }
    this.valves$.next(valvesList);

    // select first found valve
    this.selectedValve = this.valvesSearchFn(valvesList)[0];
    this.valveResults.focusSelected();
  }

  onSearchArea() {
    this.isSelecting = true;
    this.hasSelection = true;
  }

  onClearSelection() {
    this.isSelecting = false;
    this.hasSelection = false;
  }

  onAssetChange(evt: MatSelectionListChange) {
    this.selectedAsset = evt.options[0]?.value;
    const valvesList = this.getSelectedAssetValves();
    this.valves$.next(valvesList);

    // select first found valve
    this.selectedValve = this.valvesSearchFn(valvesList)[0];
    this.valveResults.focusSelected();
  }

  onValveChange(evt: MatSelectionListChange) {
    this.selectedValve = evt.options[0]?.value;
  }

  onValveSelect(valve: Valve) {
    this.dialog.open(ValveDialogComponent, {
      ...ValveDialogComponent.defaultConfig,
      data: {
        valve: valve,
        asset: this.selectedAsset,
      } as ValveDialogData,
    });
  }

  private valvesSearchFn(valves: Valve[]) {
    const results = valves
      .sort((a, b) => (a.assetTag < b.assetTag ? -1 : 1))
      .filter(valveFilterFn(this.searchFilter));
    return results;
  }

  private getSelectedAssetValves() {
    let valvesList: Valve[] = [];
    if (this.selectedAsset) {
      valvesList = VALVES.filter((v) => v.manifoldId == this.selectedAsset.id);
    }
    return valvesList;
  }
}

function assetfilterFn(searchFilter: any) {
  return (v: Mainfold) => {
    if (searchFilter?.searchText) {
      const regExp = new RegExp(searchFilter.searchText, 'ig');
      return regExp.test(v.name) || regExp.test(v.assetTag);
    }
    return true;
  };
}

function valveFilterFn(searchFilter: any) {
  return (v: Valve) => {
    if (searchFilter?.searchText) {
      const regExp = new RegExp(searchFilter.searchText, 'ig');
      return regExp.test(v.assetTag) || regExp.test(v.assetTag);
    }
    return true;
  };
}
