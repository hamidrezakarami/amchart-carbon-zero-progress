import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IAxisLabel, IEditAxisLabel } from '../../interfaces';
import { ConfirmDialogComponent } from 'src/app/shared/components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-axis-label-form',
  templateUrl: './axis-label-form.component.html',
  styleUrls: ['./axis-label-form.component.scss'],
})
export class AxisLabelFormComponent {
  @Input() axisLabels: Array<IAxisLabel> = [];
  @Output() deleteItem = new EventEmitter<IAxisLabel>();
  @Output() addItem = new EventEmitter<IAxisLabel>();
  @Output() editItem = new EventEmitter<IEditAxisLabel>();

  constructor(private dialog: MatDialog) {}

  form: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required]),
    fill: new FormControl(''),
  });
  selectedEditItem: IAxisLabel | null = null;

  onEditItem(item: IAxisLabel) {
    this.form.patchValue({ ...item });
    this.selectedEditItem = item;
  }
  onDeleteItem(item: IAxisLabel) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Delete Item',
        title: `Do you want to delete item ${item.category} ?`,
        yesButton: 'Yes',
        noButton: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) this.deleteItem.emit(item);
    });
  }
  onCloseEditMode() {
    this.selectedEditItem = null;
    this.form.reset();
  }
  onSubmitEditItem() {
    if (this.form.valid && this.selectedEditItem) {
      const fill = this.form.value.fill?.hex
        ? '#' + this.form.value.fill.hex
        : null;
      const newItem = {
        ...this.form.value,
        fill,
      };
      this.editItem.emit({ oldItem: this.selectedEditItem, newItem });
      this.form.reset();
      this.selectedEditItem = null;
    }
  }
  onAddItem() {
    if (this.form.valid) {
      const fill = this.form.value.fill?.hex
        ? '#' + this.form.value.fill.hex
        : null;
      this.addItem.emit({
        ...this.form.value,
        fill,
      });
      this.form.reset();
    }
  }
}
