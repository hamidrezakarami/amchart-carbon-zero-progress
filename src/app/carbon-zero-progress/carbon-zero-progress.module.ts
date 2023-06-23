import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_COLOR_FORMATS,
  NgxMatColorPickerModule,
  NGX_MAT_COLOR_FORMATS,
} from '@angular-material-components/color-picker';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { CarbonZeroProgressRoutingModule } from './carbon-zero-progress-routing.module';
import { CarbonZeroProgressComponent } from './carbon-zero-progress.component';
import {
  FormComponent,
  ChartComponent,
  ChartDataComponent,
} from './components';
import { AxisLabelFormComponent } from './components/axis-label-form/axis-label-form.component';

const MATERIAL_MODUlES = [
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  NgxMatColorPickerModule,
  MatFormFieldModule,
  MatCardModule,
  MatRadioModule,
  MatSelectModule,
  MatDialogModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
];

@NgModule({
  declarations: [
    CarbonZeroProgressComponent,
    FormComponent,
    ChartComponent,
    ChartDataComponent,
    AxisLabelFormComponent,
  ],
  imports: [
    CommonModule,
    CarbonZeroProgressRoutingModule,
    ...MATERIAL_MODUlES,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }],
})
export class CarbonZeroProgressModule {}
