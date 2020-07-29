import { NgModule } from "@angular/core";

// material components
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';

const MaterialModules = [
  MatButtonModule,
  MatDividerModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatTabsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatChipsModule
]

@NgModule({
  declarations: [],
  imports: MaterialModules,
  exports: MaterialModules
})
export class MaterialModule {}
