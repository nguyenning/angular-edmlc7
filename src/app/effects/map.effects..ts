import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { MapActions } from '../actions';
import { MainMapService } from '../services/main-map.service';

@Injectable()
export class MapEffects {
  goto$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(MapActions.goTo),
        tap((g) => {
          if (this.mapSvc.view) {
            this.mapSvc.view.goTo(g.target, g.options);
          }
          console.log({
            g,
          });
        })
      );
    },
    {
      dispatch: false,
    }
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private mapSvc: MainMapService
  ) {}
}
