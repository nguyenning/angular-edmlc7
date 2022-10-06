import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounceTime, Subscription } from 'rxjs';
import { SimOps, SIMOPS } from '../data/simops';
import { NewPlanService } from '../services/new-plan.service';

export interface SimopsDialogData {
  searchText?: string;
  statuses?: string[];
  myPlans?: boolean;
}

@Component({
  selector: 'app-simops-dialog',
  templateUrl: './simops-dialog.component.html',
  styleUrls: ['./simops-dialog.component.scss'],
})
export class SimopsDialogComponent implements OnInit, OnDestroy {
  simopses: SimOps[];

  filterFg: FormGroup;

  static dialogOptions: MatDialogConfig = {
    width: '800px',
    minHeight: '500px',
    disableClose: true,
  };

  private sub = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: SimopsDialogData,
    private newPlanSvc: NewPlanService
  ) {
    this.filterFg = new FormGroup({
      searchText: new FormControl(this.data.searchText),
      statuses: new FormControl(this.data.statuses),
      myPlans: new FormControl(this.data.myPlans),
    });
  }

  ngOnInit(): void {
    this.simopses = this.filterSimops();

    const sub = this.filterFg.valueChanges
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.simopses = this.filterSimops();
      });
    this.sub.add(sub);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onSubmit() {
    this.simopses = this.filterSimops();
  }

  onNewPlan() {
    this.newPlanSvc.open();
  }

  filterSimops() {
    return SIMOPS.filter((s) => {
      const { searchText, statuses, myPlans } = this.filterFg.value;
      let searchFound = true;
      let statusFound = true;
      let myPlansFound = true;
      if (searchText?.length) {
        const regExp = new RegExp(searchText, 'ig');
        searchFound = regExp.test(s.planName) || regExp.test(s.createdBy);
      }
      if (statuses.length) {
        statusFound = statuses.includes(s.currentState);
      }
      if (myPlans) {
        myPlansFound = s.createdBy === 'Alex';
      }
      return searchFound && statusFound && myPlansFound;
    });
  }
}
