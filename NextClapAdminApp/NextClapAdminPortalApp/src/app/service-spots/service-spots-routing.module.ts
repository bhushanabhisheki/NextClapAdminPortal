import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceSpotsComponent } from './service-spots.component';

const routes: Routes = [{ path: '', component: ServiceSpotsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceSpotsRoutingModule { }
