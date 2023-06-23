import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ICarbonZeroProgress, IEditCarbonZeroProgress } from '../../interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components';

@Component({
  selector: 'app-chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.scss'],
})
export class ChartDataComponent {
  @Input() dataSource: Array<ICarbonZeroProgress> = [];
  @Output() deleteItem = new EventEmitter<ICarbonZeroProgress>();
  @Output() addItem = new EventEmitter<ICarbonZeroProgress>();
  @Output() editItem = new EventEmitter<IEditCarbonZeroProgress>();
  @Output() currentBulletChanged = new EventEmitter<ICarbonZeroProgress>();
  @Output() targetBulletChanged = new EventEmitter<ICarbonZeroProgress>();

  form: FormGroup = new FormGroup({
    category: new FormControl('', [Validators.required]),
    value: new FormControl('', [Validators.required]),
    fill: new FormControl('', [Validators.required]),
  });
  selectedEditItem: ICarbonZeroProgress | null = null;

  displayedColumns: string[] = ['category', 'value', 'fill', 'set', 'actions'];
  public color: ThemePalette = 'primary';

  constructor(private dialog: MatDialog) {}

  onAddItem() {
    if (this.form.valid) {
      this.addItem.emit({
        ...this.form.value,
        columnSettings: { fill: '#' + this.form.value.fill.hex },
        currentBullet: false,
        targetBullet: false,
      });
      this.form.reset();
    }
  }
  onSubmitEditItem() {
    if (this.form.valid && this.selectedEditItem) {
      const newItem = {
        ...this.form.value,
        columnSettings: { fill: '#' + this.form.value.fill.hex },
        currentBullet: false,
        targetBullet: false,
      };
      this.editItem.emit({ oldItem: this.selectedEditItem, newItem });
      this.form.reset();
      this.selectedEditItem = null;
    }
  }

  setAsCurrentBullet(item: ICarbonZeroProgress) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Set as current bullet',
        title: `Do you want to set as current bullet item ${item.category} ?`,
        yesButton: 'Yes',
        noButton: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) this.currentBulletChanged.emit(item);
    });
  }
  setAsTargetBullet(item: ICarbonZeroProgress) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        header: 'Set as target bullet',
        title: `Do you want to set as target bullet item ${item.category} ?`,
        yesButton: 'Yes',
        noButton: 'No',
      },
    });
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) this.targetBulletChanged.emit(item);
    });
  }

  onDeleteItem(item: ICarbonZeroProgress) {
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
  onEditItem(item: ICarbonZeroProgress) {
    const { columnSettings }: any = item;
    this.form.patchValue({ ...item, fill: columnSettings.fill });
    this.selectedEditItem = item;
  }

  onCloseEditMode() {
    this.selectedEditItem = null;
    this.form.reset();
  }
}
