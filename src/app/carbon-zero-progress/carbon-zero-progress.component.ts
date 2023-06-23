import { Component } from '@angular/core';

import { IXYChartSettings } from '@amcharts/amcharts5/xy';

import * as am5 from '@amcharts/amcharts5';
import {
  IAxisLabel,
  ICarbonZeroProgress,
  IEditAxisLabel,
  IEditCarbonZeroProgress,
} from './interfaces';

@Component({
  selector: 'app-carbon-zero-progress',
  templateUrl: './carbon-zero-progress.component.html',
  styleUrls: ['./carbon-zero-progress.component.scss'],
})
export class CarbonZeroProgressComponent {
  xyChart1: IXYChartSettings = {
    panX: false,
    panY: false,
    wheelX: 'none',
    wheelY: 'none',
    paddingRight: 30,
  };
  xyChart2: IXYChartSettings = {
    panX: true,
    panY: true,
    wheelX: 'none',
    wheelY: 'none',
    paddingRight: 300,
  };
  test = {
    dy: -38,
    centerY: 200,
    centerX: 50,
    populateText: true,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 5,
  };

  chartData: Array<ICarbonZeroProgress> = [
    {
      category: '15',
      value: 100,
      columnSettings: {
        fill: am5.color(0xc6251a),
      },
    },
    {
      category: '14',
      value: 100,
      columnSettings: {
        fill: am5.color(0xfcc034),
      },
    },
    {
      category: '13',
      value: 100,
      columnSettings: {
        fill: am5.color(0xc6251a),
      },
    },
    {
      category: '12',
      value: 100,
      columnSettings: {
        fill: am5.color(0xc6251a),
      },
    },
    {
      category: '11',
      value: 100,
      columnSettings: {
        fill: am5.color(0xc6251a),
      },
    },
    {
      category: '10',
      value: 100,
      currentBullet: true,
      columnSettings: {
        fill: am5.color(0xfcc034),
      },
    },
    {
      category: '9',
      value: 100,
      columnSettings: {
        fill: am5.color(0xfcc034),
      },
    },
    {
      category: '8',
      value: 100,
      columnSettings: {
        fill: am5.color(0xfcc034),
      },
    },
    {
      category: '7',
      value: 100,
      columnSettings: {
        fill: am5.color(0xfcc034),
      },
    },
    {
      category: '6',
      value: 100,
      columnSettings: {
        fill: am5.color(0xfcc034),
      },
    },
    {
      category: '5',
      value: 100,
      columnSettings: {
        fill: am5.color(0x6bc352),
      },
    },
    {
      category: '4',
      value: 100,
      columnSettings: {
        fill: am5.color(0x6bc352),
      },
    },
    {
      category: '3',
      value: 100,
      columnSettings: {
        fill: am5.color(0x6bc352),
      },
    },
    {
      category: '2',
      value: 100,
      columnSettings: {
        fill: am5.color(0x6bc352),
      },
    },
    {
      category: '1',
      value: 100,
      columnSettings: {
        fill: am5.color(0x6bc352),
      },
    },
    {
      category: '0',
      value: 100,
      targetBullet: true,
      columnSettings: {
        fill: am5.color(0xffffff),
      },
    },
  ];

  axisLabels: Array<IAxisLabel> = [
    { category: '15', text: '20+' },
    { category: '10', text: '10' },
    { category: '5', text: '5' },
  ];

  constructor() {
    // setTimeout(() => {
    //   this.test = {
    //     dy: -38,
    //     centerY: 400,
    //     centerX: 50,
    //     populateText: true,
    //     paddingTop: 50,
    //     paddingRight: 5,
    //     paddingBottom: 5,
    //     paddingLeft: 5,
    //   };
    // }, 5000);
  }

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
    this.chartData = [...this.chartData, item];
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
