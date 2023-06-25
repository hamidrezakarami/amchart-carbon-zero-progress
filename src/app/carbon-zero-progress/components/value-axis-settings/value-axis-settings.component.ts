import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as am5xy from '@amcharts/amcharts5/xy';

@Component({
  selector: 'app-value-axis-settings',
  templateUrl: './value-axis-settings.component.html',
  styleUrls: ['./value-axis-settings.component.scss'],
})
export class ValueAxisSettingsComponent {
  @Input() valueAxis!: Partial<am5xy.IValueAxisSettings<am5xy.AxisRenderer>>;
  @Output() settingChanged = new EventEmitter<
    Partial<am5xy.IValueAxisSettings<am5xy.AxisRenderer>>
  >();

  form: FormGroup = new FormGroup({
    min: new FormControl('', [Validators.required]),
    max: new FormControl('', [Validators.required]),
    strictMinMax: new FormControl('', [Validators.required]),
  });

  ngAfterViewInit() {
    if (this.valueAxis) {
      this.form.patchValue(this.valueAxis);
    }
  }

  onApply() {
    if (this.form.valid) this.settingChanged.emit(this.form.value);
  }
}
