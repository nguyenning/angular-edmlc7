import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vessel-tracking',
  templateUrl: './vessel-tracking.component.html',
  styleUrls: ['./vessel-tracking.component.scss'],
})
export class VesselTrackingComponent implements OnInit {
  isFilterExpanded = true;

  searchForm: FormGroup;

  searchFilter: any;

  constructor(private router: Router, private route: ActivatedRoute) {
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
  }
}
