import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { OnetimecalenderComponent } from './onetimecalender/onetimecalender.component';
import { EverydayComponent } from './everyday/everyday.component';
import { QuarterlyComponent } from './quarterly/quarterly.component';
import { HalfyearlyComponent } from './halfyearly/halfyearly.component';
import { AnnuallyComponent } from './annually/annually.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { ByweeklyComponent } from './byweekly/byweekly.component';
import { MonthlyComponent } from './monthly/monthly.component';
import { ValidatorComponentComponent } from './validator-component/validator-component.component';
import { SelectYearComponent } from './select-year/select-year.component';
import { MultiDatePickerComponent } from './multi-date-picker/multi-date-picker.component';
import { CalendarComponent } from './calendar.component';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    TimepickerModule.forRoot(),
    MatRadioModule,
    BrowserModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  declarations: [
    CalendarComponent,
    OnetimecalenderComponent,
    EverydayComponent,
    QuarterlyComponent,
    HalfyearlyComponent,
    AnnuallyComponent,
    WeeklyComponent,
    ByweeklyComponent,
    MonthlyComponent,
    ValidatorComponentComponent,
    SelectYearComponent,
    MultiDatePickerComponent
  ],
  exports: [
    CalendarComponent,
    OnetimecalenderComponent,
    EverydayComponent,
    QuarterlyComponent,
    HalfyearlyComponent,
    AnnuallyComponent,
    WeeklyComponent,
    ByweeklyComponent,
    MonthlyComponent,
    ValidatorComponentComponent,
    SelectYearComponent,
    MultiDatePickerComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CalendarModule { }
