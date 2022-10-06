import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import Map from '@arcgis/core/Map';
import SceneView from '@arcgis/core/views/SceneView';
import {
  Actions,
  createEffect,
  ofType,
  USER_PROVIDED_EFFECTS,
} from '@ngrx/effects';
import { MapActions } from '../actions';
import { tap } from 'rxjs/operators';
import { MapEffects } from '../effects/map.effects.';
import { MainMapService } from '../services/main-map.service';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.scss'],
})
export class MainMapComponent implements OnInit {
  @ViewChild('map', { static: true }) mapContainer: ElementRef;

  map: Map;

  view: SceneView;

  constructor(private actions$: Actions, private mapSvc: MainMapService) {}

  ngOnInit(): void {
    this.map = new Map({
      basemap: 'hybrid',
      ground: 'world-topobathymetry',
    });

    this.view = new SceneView({
      container: this.mapContainer.nativeElement,
      map: this.map,
      zoom: 8,
      center: [30.31828958444246, 43.55319799080641],
    });

    this.mapSvc.map = this.map;
    this.mapSvc.view = this.view;
  }
}
