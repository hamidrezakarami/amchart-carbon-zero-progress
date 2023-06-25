import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';

const MATERIAL_MODUlES = [MatButtonModule];

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    MATERIAL_MODUlES,
    SharedModule,
  ],
})
export class MainPageModule {}
