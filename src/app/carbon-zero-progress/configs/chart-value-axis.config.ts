import * as am5xy from '@amcharts/amcharts5/xy';

export const CHART_VALUE_AXIS_SETTINGS: Partial<
  am5xy.IValueAxisSettings<am5xy.AxisRenderer>
> = {
  min: 20,
  max: 400,
  strictMinMax: false,
};
