import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { VesselTrackingComponent } from './vessel-tracking/vessel-tracking.component';
import { VesselResultsComponent } from './components/vessel-results/vessel-results.component';
import { VesselBottomsheetComponent } from './components/vessel-bottomsheet/vessel-bottomsheet.component';
import { ResizableModule } from 'angular-resizable-element';
import { ResizableSidenavDirective } from './directives/resizable-sidenav.directive';
import { AppComponent } from './app/app.component';
import { ValveSearchComponent } from './valve-search/valve-search.component';
import { DetailPanelComponent } from './components/detail-panel/detail-panel.component';
import { ValveResultsComponent } from './components/valve-results/valve-results.component';
import { ValveDialogComponent } from './valve-dialog/valve-dialog.component';
import { LabelValueComponent } from './components/label-value/label-value.component';
import { ValveHistoryContentComponent } from './components/valve-history-content/valve-history-content.component';
import { AssetResultsComponent } from './components/asset-results/asset-results.component';
import { MainMapComponent } from './main-map/main-map.component';
import { SimopsDialogComponent } from './simops-dialog/simops-dialog.component';
import { NewPlanDialogComponent } from './new-plan-dialog/new-plan-dialog.component';
import { ValveChangeDialogComponent } from './valve-change-dialog/valve-change-dialog.component';
import { SimopsPanelComponent } from './simops-panel/simops-panel.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MapEffects } from './effects/map.effects.';

const routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: MainMapComponent,
      },
      {
        outlet: 'nav-details',
        path: 'simops',
        component: SimopsPanelComponent,
      },
      {
        outlet: 'nav-details',
        path: 'valves',
        component: ValveSearchComponent,
      },
      {
        outlet: 'nav-details',
        path: 'vessels',
        component: VesselTrackingComponent,
      },
    ],
  },
  {
    path: 'vessel-tracking',
    component: VesselTrackingComponent,
  },
  { path: '**', redirectTo: '' },
] as Routes;

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    VesselTrackingComponent,
    VesselResultsComponent,
    VesselBottomsheetComponent,
    ResizableSidenavDirective,
    AppComponent,
    ValveSearchComponent,
    DetailPanelComponent,
    ValveResultsComponent,
    ValveDialogComponent,
    LabelValueComponent,
    ValveHistoryContentComponent,
    AssetResultsComponent,
    MainMapComponent,
    SimopsDialogComponent,
    NewPlanDialogComponent,
    ValveChangeDialogComponent,
    SimopsPanelComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialExampleModule,
    ResizableModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot([]),
    EffectsModule.forRoot([MapEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
