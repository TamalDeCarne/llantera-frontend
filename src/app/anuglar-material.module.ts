import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatCardModule,
     MatButtonModule,
     MatToolbarModule,
     MatIconModule,
     MatBadgeModule,
     MatSidenavModule,
     MatListModule,
     MatGridListModule,
     MatInputModule,
     MatSelectModule,
     MatRadioModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatChipsModule,
     MatTooltipModule,
     MatTableModule,
     MatPaginatorModule,
     MatDialogModule,
     MatStepperModule
} from '@angular/material';

@NgModule({
    declarations: [],
    imports: [ 
        MatCardModule,
        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatStepperModule
     ],
    exports: [
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatBadgeModule,
        MatSidenavModule,
        MatListModule,
        MatGridListModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatDialogModule,
        MatStepperModule
    ],
    providers: [
        MatDatepickerModule,
    ],
})

export class AngularMaterialModule {}