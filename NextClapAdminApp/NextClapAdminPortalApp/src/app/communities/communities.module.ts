import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunitiesRoutingModule } from './communities-routing.module';
import { CommunitiesComponent } from './communities.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [CommunitiesComponent],
  imports: [CommonModule, CommunitiesRoutingModule, MaterialModule],
})
export class CommunitiesModule {}
