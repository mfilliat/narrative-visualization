import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CliDefaultComponent } from './cli-default/cli-default.component';
import { GridComponent } from './grid/grid.component';
import { InteractiveSlideshowComponent } from './interactive-slideshow/interactive-slideshow.component';
import {InteractiveSlideshowVerticalComponent} from './interactive-slideshow-vertical/interactive-slideshow-vertical.component';

const routes: Routes = [
  { path: '', component: InteractiveSlideshowVerticalComponent },
  { path: 'interactive-slideshow-vertical', component: InteractiveSlideshowVerticalComponent},
  { path: 'interactive-slideshow-horizontal', component: InteractiveSlideshowComponent},
  { path: 'grid', component: GridComponent},
  { path: 'cli-default', component: CliDefaultComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
