import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "chart",
    loadChildren: () =>
      import("./carbon-zero-progress/carbon-zero-progress.module").then(
        (m) => m.CarbonZeroProgressModule
      ),
  },
  {
    path: "**",
    redirectTo: "chart",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
