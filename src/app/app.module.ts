import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CliDefaultComponent } from './cli-default/cli-default.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { GridComponent } from './grid/grid.component';
import { MatGridListModule } from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import { InteractiveSlideshowComponent } from './interactive-slideshow/interactive-slideshow.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InteractiveSlideshowVerticalComponent } from './interactive-slideshow-vertical/interactive-slideshow-vertical.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { DonutChartCurrWeekComponent } from './donut-chart-curr-week/donut-chart-curr-week.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Overlay} from '@angular/cdk/overlay';

@NgModule({
  declarations: [
    AppComponent,
    CliDefaultComponent,
    GridComponent,
    InteractiveSlideshowComponent,
    InteractiveSlideshowVerticalComponent,
    DonutChartComponent,
    DonutChartCurrWeekComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  providers: [
    MatSnackBar,
    Overlay,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
