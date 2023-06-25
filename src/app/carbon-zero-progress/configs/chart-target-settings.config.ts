import * as am5 from '@amcharts/amcharts5';

export const CHART_TARGET_SETTINGS: Partial<am5.ILabelSettings> = {
  text: '[bold]GOAL[/]',
  textAlign: 'left',
  fontSize: '18px',
  fill: am5.color(0xffffff),
  centerY: am5.p50,
  centerX: am5.p50,
  populateText: true,
};
