import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IXYChartSettings } from '@amcharts/amcharts5/xy';

@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.scss'],
})
export class ChartSettingsComponent {
  @Input() chartSettings!: Partial<IXYChartSettings>;
  @Output() settingChanged = new EventEmitter<Partial<IXYChartSettings>>();

  form: FormGroup = new FormGroup({
    dy: new FormControl('', [Validators.required]),
    centerY: new FormControl('', [Validators.required]),
    centerX: new FormControl('', [Validators.required]),
    paddingTop: new FormControl('', [Validators.required]),
    paddingRight: new FormControl('', [Validators.required]),
    paddingBottom: new FormControl('', [Validators.required]),
    paddingLeft: new FormControl('', [Validators.required]),
    panX: new FormControl('', [Validators.required]),
    panY: new FormControl('', [Validators.required]),
    wheelX: new FormControl('', [Validators.required]),
    wheelY: new FormControl('', [Validators.required]),
  });
  wheelValues = ['zoomX', 'zoomY', 'zoomXY', 'panX', 'panY', 'panXY', 'none'];

  ngAfterViewInit() {
    if (this.chartSettings) {
      this.form.patchValue(this.chartSettings);
    }
  }

  onApply() {
    if (this.form.valid) this.settingChanged.emit(this.form.value);
  }

  valueChangeWheel(type: string, data: string) {
    this.form.patchValue({
      [type]: data,
    });
  }
}
