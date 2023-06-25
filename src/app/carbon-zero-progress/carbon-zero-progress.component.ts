import { Component } from '@angular/core';
import {
  IAxisLabel,
  ICarbonZeroProgress,
  IEditAxisLabel,
  IEditCarbonZeroProgress,
} from './interfaces';
import {
  CHART_AXIS_LABELS,
  CHART_DATA,
  CHART_SETTINGS,
  CHART_TARGET_SETTINGS,
  CHART_VALUE_AXIS_SETTINGS,
} from './configs';

@Component({
  selector: 'app-carbon-zero-progress',
  templateUrl: './carbon-zero-progress.component.html',
  styleUrls: ['./carbon-zero-progress.component.scss'],
})
export class CarbonZeroProgressComponent {
  valueAxis = CHART_VALUE_AXIS_SETTINGS;
  chartSettings = CHART_SETTINGS;
  chartData = CHART_DATA;
  axisLabels = CHART_AXIS_LABELS;
  targetSettings = CHART_TARGET_SETTINGS;

  constructor() {}

  onDeleteChartDataItem(item: ICarbonZeroProgress) {
    this.chartData = this.chartData.filter((el) => el !== item);
  }
  onEditChartDataItem(item: IEditCarbonZeroProgress) {
    this.chartData = this.chartData.map((el) => {
      return el === item.oldItem ? item.newItem : el;
    });
  }
  currentBulletChanged(item: ICarbonZeroProgress) {
    this.chartData = this.chartData.map((el) => {
      if (el === item) el.currentBullet = true;
      else el.currentBullet = false;
      return el;
    });
  }
  targetBulletChanged(item: ICarbonZeroProgress) {
    this.chartData = this.chartData.map((el) => {
      if (el === item) el.targetBullet = true;
      else el.targetBullet = false;
      return el;
    });
  }

  onAddChartDataItem(item: ICarbonZeroProgress) {
    this.chartData = [item, ...this.chartData];
  }

  onAddAxisLabelItem(item: IAxisLabel) {
    this.axisLabels = [...this.axisLabels, item];
  }
  onDeleteAxisLabelItem(item: IAxisLabel) {
    this.axisLabels = this.axisLabels.filter((el) => el !== item);
  }
  onEditAxisLabelItem(item: IEditAxisLabel) {
    this.axisLabels = this.axisLabels.map((el) => {
      return el === item.oldItem ? item.newItem : el;
    });
  }
}
