import { createAction, props } from '@ngrx/store';

export const goTo = createAction(
  '[Map] Go To',
  props<{
    target: any;
    options?: __esri.GoToOptions3D;
  }>()
);
