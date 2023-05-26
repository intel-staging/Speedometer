import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollInterObserComponent } from './components/scroll-inter-obser/scroll-inter-obser.component';

const routes: Routes = [
  {
    path: '', redirectTo: '/app-scroll', pathMatch: 'full'
  },
  { 
    path: 'app-scroll', component: ScrollInterObserComponent
  },
  {
    path: '**',
    redirectTo: 'app-scroll',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
