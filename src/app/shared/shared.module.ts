import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmDialogComponent } from './components';

const MATERIAL_MODULES = [MatDialogModule, MatButtonModule];

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [CommonModule, ...MATERIAL_MODULES],
})
export class SharedModule {}
