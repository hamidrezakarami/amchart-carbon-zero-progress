import { Component, NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CarbonZeroProgressComponent } from "./carbon-zero-progress.component";

const routes: Routes = [
  {
    path: "",
    component: CarbonZeroProgressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CarbonZeroProgressRoutingModule {}
