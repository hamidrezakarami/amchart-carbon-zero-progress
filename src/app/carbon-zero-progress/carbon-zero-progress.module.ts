import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Material
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";

import { CarbonZeroProgressRoutingModule } from "./carbon-zero-progress-routing.module";
import { CarbonZeroProgressComponent } from "./carbon-zero-progress.component";
import {
  FormComponent,
  ChartComponent,
  ChartDataComponent,
} from "./components";

const MATERIAL_MODUlES = [MatInputModule, MatTableModule, MatPaginatorModule];

@NgModule({
  declarations: [
    CarbonZeroProgressComponent,
    FormComponent,
    ChartComponent,
    ChartDataComponent,
  ],
  imports: [
    CommonModule,
    CarbonZeroProgressRoutingModule,
    ...MATERIAL_MODUlES,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CarbonZeroProgressModule {}
