import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceSpotsRoutingModule } from './service-spots-routing.module';
import { ServiceSpotsComponent } from './service-spots.component';
import { MaterialModule } from '../material.module';
import { FormioModule } from '@formio/angular';

@NgModule({
  declarations: [ServiceSpotsComponent],
  imports: [
    CommonModule,
    ServiceSpotsRoutingModule,
    MaterialModule,
    FormioModule,
  ],
})
export class ServiceSpotsModule {}
