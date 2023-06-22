import { Component, Input } from "@angular/core";
import { ICarbonZeroProgress } from "../../interfaces";

@Component({
  selector: "app-chart-data",
  templateUrl: "./chart-data.component.html",
  styleUrls: ["./chart-data.component.scss"],
})
export class ChartDataComponent {
  @Input() dataSource: Array<ICarbonZeroProgress> = [];

  displayedColumns: string[] = ["category", "value", "fill"];
}
