import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatSelectModule,MatCheckboxModule,
  MatDividerModule,MatSidenavModule,MatListModule,MatGridListModule,MatProgressBarModule,MatBottomSheetModule
} from '@angular/material';
@NgModule({
  imports: [
  CommonModule,
  MatToolbarModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDividerModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatProgressBarModule,
  MatBottomSheetModule
  ],
  exports: [
  CommonModule,
   MatToolbarModule,
   MatButtonModule,
   MatCardModule,
   MatInputModule,
   MatDialogModule,
   MatTableModule,
   MatMenuModule,
   MatIconModule,
   MatProgressSpinnerModule,
   MatSelectModule,
   MatCheckboxModule,
   MatDividerModule,
   MatSidenavModule,
   MatListModule,
   MatGridListModule,
   MatProgressBarModule,
   MatBottomSheetModule
   ],
})
export class MaterialModule { }
