import { debounceTime, Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SIMOPS, SimOps } from '../data/simops';
import { NewPlanService } from '../services/new-plan.service';
import { Store } from '@ngrx/store';
import { MapActions } from '../actions';

@Component({
  selector: 'app-simops-panel',
  templateUrl: './simops-panel.component.html',
  styleUrls: ['./simops-panel.component.scss'],
})
export class SimopsPanelComponent implements OnInit {
  isFilterExpanded = true;

  simopses: SimOps[];

  filterFg: FormGroup;

  private sub = new Subscription();

  constructor(private newPlanSvc: NewPlanService, private store: Store) {
    this.filterFg = new FormGroup({
      searchText: new FormControl(),
      statuses: new FormControl([]),
      myPlans: new FormControl([]),
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

  onFilterExpansionToggle(isExpanded: boolean) {
    this.isFilterExpanded = isExpanded;
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

  onPlanClick(plan: SimOps) {
    this.store.dispatch(
      MapActions.goTo({
        target: {
          center: [plan.lng, plan.lat],
          zoom: 12,
        },
        options: {
          easing: 'in-out-cubic',
          maxDuration: 1000,
        },
      })
    );
  }

  private filterSimops() {
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
