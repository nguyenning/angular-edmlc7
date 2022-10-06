import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MainMapService {
  map: __esri.Map;
  view: __esri.SceneView;

  constructor() {}
}
