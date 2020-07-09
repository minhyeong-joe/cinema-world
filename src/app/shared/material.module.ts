import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material components
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
