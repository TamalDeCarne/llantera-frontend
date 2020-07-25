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
     MatStepperModule,
     MatExpansionModule,
     MatAccordion
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
        MatStepperModule,
        MatExpansionModule
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
        MatStepperModule,
        MatExpansionModule
    ],
    providers: [
        MatDatepickerModule,
    ],
})

export class AngularMaterialModule {}