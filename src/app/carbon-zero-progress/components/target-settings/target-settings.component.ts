import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as am5 from '@amcharts/amcharts5';

@Component({
  selector: 'app-target-settings',
  templateUrl: './target-settings.component.html',
  styleUrls: ['./target-settings.component.scss'],
})
export class TargetSettingsComponent {
  @Input() targetSettings!: Partial<am5.ILabelSettings>;
  @Output() settingChanged = new EventEmitter<Partial<am5.ILabelSettings>>();
  form: FormGroup = new FormGroup({
    text: new FormControl('', [Validators.required]),
    textAlign: new FormControl('', [Validators.required]),
    fontSize: new FormControl('', [Validators.required]),
    fill: new FormControl('', [Validators.required]),
    centerY: new FormControl('', [Validators.required]),
    centerX: new FormControl('', [Validators.required]),
  });

  textAlignValues = [
    { label: 'start', value: 'start' },
    { label: 'end', value: 'end' },
    { label: 'left', value: 'left' },
    { label: 'right', value: 'right' },
    { label: 'center', value: 'center' },
  ];

  ngAfterViewInit() {
    if (this.targetSettings) {
      const { fontSize, centerY, centerX } = this.targetSettings;
      const strFontSize = fontSize ? fontSize.toString().split('px')[0] : 0;
      this.form.patchValue({
        ...this.targetSettings,
        fontSize: +strFontSize,
        centerX: (centerX as any)._value ?? 0,
        centerY: (centerY as any)._value ?? 0,
      });
    }
  }

  valueChange(item: any) {
    this.form.get('textAlign')?.setValue(item);
  }

  onApply() {
    if (this.form.valid)
      this.settingChanged.emit({
        ...this.form.value,
        fill: am5.color('#' + this.form.value.fill.hex),
        fontSize: this.form.value.fontSize + 'px',
      });
  }
}
