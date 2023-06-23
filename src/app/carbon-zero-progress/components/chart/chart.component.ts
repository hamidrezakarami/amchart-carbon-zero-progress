import { Component, Inject, Input, NgZone, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { ICarbonZeroProgress } from '../../interfaces';
import { IXYChartSettings } from '@amcharts/amcharts5/xy';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
})
export class ChartComponent {
  @Input() set data(value: Array<ICarbonZeroProgress>) {
    this._data = value;
    if (this.chart) this.series.data.setAll(this._data);
    // this.chart.series.setAll(value)
  }
  @Input() XYChart: IXYChartSettings = {
    panX: false,
    panY: false,
    wheelX: 'none',
    wheelY: 'none',
    paddingRight: 30,
  };
  // TODO: type
  @Input() ValueAxis = {
    min: 0,
    max: 400,
    strictMinMax: true,
  };
  // TODO: type
  @Input() columnSeries = {
    valueYField: 'value',
    categoryXField: 'category',
    maskBullets: false,
  };
  // TODO: type
  @Input() columnsTemplate = {
    width: am5.p100,
    tooltipY: 0,
    strokeOpacity: 1,
    strokeWidth: 2,
    stroke: am5.color(0xffffff),
    templateField: 'columnSettings',
  };
  
  @Input() set label(value: any) {
    Object.keys(value).forEach((key) => {
      console.error(key);
      this.chart.set(key as keyof IXYChartSettings, value[key.toString()]);
    });
  }

  @Input() background: am5.IRoundedRectangleSettings = {
    fill: am5.color(0xffffff),
    cornerRadiusTL: 20,
    cornerRadiusTR: 20,
    cornerRadiusBR: 20,
    cornerRadiusBL: 20,
  };
  private chart!: am5xy.XYChart;
  series!: am5xy.ColumnSeries;
  xAxis!: am5xy.CategoryAxis<am5xy.AxisRenderer>;
  _data: Array<ICarbonZeroProgress> = [];
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone
    ) {}
    
    // Run the function only in the browser
    browserOnly(f: () => void) {
      if (isPlatformBrowser(this.platformId)) {
        this.zone.runOutsideAngular(() => {
          f();
        });
      }
    }

  ngAfterViewInit() {
    let root = am5.Root.new('chartdiv');

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    // https://www.amcharts.com/docs/v5/charts/xy-chart/
    let chart = root.container.children.push(
      am5xy.XYChart.new(root, { ...this.XYChart, layout: root.verticalLayout })
    );

    // Add legend
    // https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
    let legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.p50,
        x: am5.p50,
      })
    );

    // Create axes
    // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
    this.xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'category',
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    );

    let xRenderer = this.xAxis.get('renderer');

    xRenderer.grid.template.set('forceHidden', true);
    xRenderer.labels.template.set('forceHidden', true);

    this.xAxis.data.setAll(this._data);

    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        ...this.ValueAxis,
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    let yRenderer = yAxis.get('renderer');

    yRenderer.grid.template.set('forceHidden', true);
    yRenderer.labels.template.set('forceHidden', true);

    // Add series
    // https://www.amcharts.com/docs/v5/charts/xy-chart/series/

    this.series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        xAxis: this.xAxis,
        yAxis: yAxis,
        ...this.columnSeries,
      })
    );

    this.series.columns.template.setAll(this.columnsTemplate);
    this.series.bullets.push(function (root, target, dataItem) {
      let dataContext: any = dataItem.dataContext;
      if (dataContext?.currentBullet) {
        let container = am5.Container.new(root, {});

        let pin = container.children.push(
          am5.Graphics.new(root, {
            fill: dataContext.columnSettings?.fill,
            dy: -5,
            centerY: am5.p100,
            centerX: am5.p50,
            svgPath:
              'M66.9 41.8c0-11.3-9.1-20.4-20.4-20.4-11.3 0-20.4 9.1-20.4 20.4 0 11.3 20.4 32.4 20.4 32.4s20.4-21.1 20.4-32.4zM37 41.4c0-5.2 4.3-9.5 9.5-9.5s9.5 4.2 9.5 9.5c0 5.2-4.2 9.5-9.5 9.5-5.2 0-9.5-4.3-9.5-9.5z',
          })
        );

        // let label = container.children.push(
        //   am5.Label.new(root, {
        //     text: dataItem.get("categoryX"),
        //     dy: -38,
        //     centerY: am5.p50,
        //     centerX: am5.p50,
        //     populateText: true,
        //     paddingTop: 5,
        //     paddingRight: 5,
        //     paddingBottom: 5,
        //     paddingLeft: 5,
        //     background: am5.RoundedRectangle.new(root, {
        //       fill: am5.color(0xffffff),
        //       cornerRadiusTL: 2000,
        //       cornerRadiusTR: 2000,
        //       cornerRadiusBR: 20,
        //       cornerRadiusBL: 20,
        //     }),
        //   })
        // );

        return am5.Bullet.new(root, {
          locationY: 1,
          sprite: container,
        });
      } else if (dataContext.targetBullet) {
        let container = am5.Container.new(root, {
          dx: 15,
        });

        let circle = container.children.push(
          am5.Circle.new(root, {
            radius: 34,
            fill: am5.color(0x11326d),
          })
        );

        let label = container.children.push(
          am5.Label.new(root, {
            text: 'GOAL\n[bold]ZERO[/]',
            textAlign: 'center',
            //fontSize: "10",
            fill: am5.color(0xffffff),
            centerY: am5.p50,
            centerX: am5.p50,
            populateText: true,
          })
        );
        return am5.Bullet.new(root, {
          locationY: 0.5,
          sprite: container,
        });
      }
      return undefined;
    });

    this.series.data.setAll(this._data);

    this.addAxisLabel('15', '20+');
    this.addAxisLabel('10', '10');
    this.addAxisLabel('5', '5');

    // Make stuff animate on load
    // https://www.amcharts.com/docs/v5/concepts/animations/
    this.series.appear(1000, 100);
    chart.appear(1000, 100);
    this.chart = chart;
    console.log(this.chart);

    setTimeout(() => {
      // this.updateData(400);
      console.error(this.chart);
    }, 5000);
  }

  // Add labels
  addAxisLabel(category: any, text: any) {
    let rangeDataItem = this.xAxis.makeDataItem({
      category: category,
    });

    let range = this.xAxis.createAxisRange(rangeDataItem);
    if (range) {
      range.get('label')?.setAll({
        //fill: am5.color(0xffffff),
        text: text,
        forceHidden: false,
      });

      range.get('grid')?.setAll({
        //stroke: color,
        strokeOpacity: 1,
        location: 1,
      });
    }
  }

  // updateChartStyle(data: any) {
  //   this.
  //   this.chart.set("paddingRight", data);
  // }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
