import { OwlDateTimeComponent } from 'ng-pick-datetime';
import { FormControl, FormsModule, ControlValueAccessor } from '@angular/forms';
import { Utils } from './../custom/Utils';
import { DatePipe } from '@angular/common';
import { CalenderModel } from './../models/calender';

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import * as _moment from 'moment';
import { Moment } from 'moment';
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'app-multi-date-picker',
  templateUrl: './multi-date-picker.component.html',
  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
    .custom-day.selected{  
      background-color: rgba(255, 255, 0, .5);
        
    }
  `],
  providers: [FormsModule]
})
export class MultiDatePickerComponent implements ControlValueAccessor {
  writeValue(obj: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    throw new Error("Method not implemented.");
  }
  registerOnTouched(fn: any): void {
    throw new Error("Method not implemented.");
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error("Method not implemented.");
  }

  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  selectedWeekDays: any = [];
  _datesSelected: NgbDateStruct[] = [];
  utilsObj: Utils = new Utils(this.datePipe);
  public selectedMoment: string;
  public strDate: Date;
  public endsDate: Date;
  public fromYear: number;
  public toYear: number;
  public fromMonth: number;
  public toMonth: number;
  public weeklyCalendarObj: Array<CalenderModel> = [];

  public endDateValidation = true;
  public dateValidationFlag = true;

  model: NgbDateStruct;
  disabled = true;

  public weeklyValidationFlag = false;
  public mainErrorMsg = '';
  public startDate = new FormControl(moment());
  public endDate = new FormControl(moment());

  @Output() public weeklyCalendarChanged = new EventEmitter();

  @Input()
  set datesSelected(value: NgbDateStruct[]) {
    this._datesSelected = value;

  }
  get datesSelected(): NgbDateStruct[] {
    return this._datesSelected ? this._datesSelected : [];
  }

  /*  @Output() datesSelectedChange = new EventEmitter<NgbDateStruct[]>(); */

  constructor(calendar: NgbCalendar, public datePipe: DatePipe) {
    this.datePipe = datePipe;
    this.model = calendar.getToday();
  }

  chosenYearHandler(normalizedYear: Moment) {
    console.log("chosenYearHandler");
    const ctrlValue = this.startDate.value;
    ctrlValue.year(normalizedYear.year());
    this.startDate.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datePicker: OwlDateTimeComponent<Moment>) {
    console.log("chosenMonthHandler");
    const ctrlValue = this.startDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.startDate.setValue(ctrlValue);
    datePicker.close();
  }

  chosenEndYearHandler(normalizedYear: Moment) {
    console.log("chosenEndYearHandler");
    const ctrlValue = this.endDate.value;
    ctrlValue.year(normalizedYear.year());
    this.endDate.setValue(ctrlValue);
  }

  chosenEndMonthHandler(normalizedMonth: Moment, datePicker: OwlDateTimeComponent<Moment>) {
    console.log("chosenEndMonthHandler");
    const ctrlValue = this.endDate.value;
    ctrlValue.month(normalizedMonth.month());
    this.endDate.setValue(ctrlValue);
    datePicker.close();
  }

  yearMonthHandler(event) {
    console.log("year Handler");
    if (this.strDate === undefined || this.strDate.toString() === '') {
      this.endDateValidation = true;
    } else {
      this.endDateValidation = false;
    }

    if (this.endsDate === undefined || this.endsDate.toString() === '') {
      this.dateValidationFlag = true;
      this.disabled = true; //Disable Calender
    } else {
      this.dateValidationFlag = false;
      this.disabled = false; //Enable Calender
    }

    if (this.strDate > this.endsDate) {
      this.mainErrorMsg = 'Start Date is greater that endDate !';
      this.weeklyValidationFlag = true;
    } else {
      this.weeklyValidationFlag = false;
    }


    let now = moment(this.strDate).format('MMM YYYY');
    this.fromYear = moment(this.strDate).format('YYYY');
    this.fromMonth = moment(this.strDate).format('MM');

    let now1 = moment(this.endsDate).format('MMM YYYY');
    this.toYear = moment(this.endsDate).format('YYYY');
    this.toMonth = moment(this.endsDate).format('MM');
    this.onDateSelection(event, null);
  }


  onDateSelection(event: any, date: NgbDateStruct) {
    console.log("event--->", JSON.stringify(event));
    console.log("date--->", JSON.stringify(date));
    if (this.disabled === false) {
      let now;
      if (date === null) {
        console.log("null");
      } else {
        console.log("date--->", JSON.stringify(date));
        now = new Date(date.year, date.month - 1, date.day);
        if (this.selectedWeekDays.length > 0) {
          if (this.selectedWeekDays.includes(now.getDay())) {
            for (let i = 0; i < this.selectedWeekDays.length; i++) {
              if (this.selectedWeekDays[i] === now.getDay()) {
                this.selectedWeekDays.splice(i, 1);
              }
            }

          } else {
            this.selectedWeekDays.push(now.getDay());
          }
        } else {
          this.selectedWeekDays.push(now.getDay());
        }
        console.log("selectedWeekDays--->", JSON.stringify(this.selectedWeekDays));
      }

      let sCalDate = new Date(this.strDate);
      let sYear = sCalDate.getFullYear();
      let sMonth = sCalDate.getMonth();
      let sDate = sCalDate.getDate();
      let eCalDate = new Date(this.endsDate);
      let eYear = eCalDate.getFullYear();
      let eMonth = eCalDate.getMonth();
      let eDate = eCalDate.getDate();


      let dates = this.utilsObj.getMultipleWeekDates(new Date(sYear, sMonth, sDate),
        new Date(eYear, eMonth, eDate),
        false, this.selectedWeekDays);

      this.datesSelected = [];
      let calArr = [];
      for (let i = 0; i < dates.length; i++) {

        let year = this.datePipe.transform(dates[i], 'yyyy');
        let date = this.datePipe.transform(dates[i], 'dd');
        let month = this.datePipe.transform(dates[i], 'MMM');

        let dateObj = {
          "year": parseInt(year),
          "month": parseInt(month),
          "day": parseInt(date)
        };
        this.datesSelected.push(dateObj);

        let calenderModel = new CalenderModel();
        calenderModel.start_date = year + "-" + month + "-" + date;
        calenderModel.end_date = year + "-" + month + "-" + date;//this.datePipe.transform(date, 'dd-MM-yyyy');
        calArr.push(calenderModel);
      }

      this.weeklyCalendarObj = calArr;
      this.weeklyCalendarChanged.emit(this.weeklyCalendarObj);
    }
  }




  addDate(date: NgbDateStruct) {
    let index = this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year);
    if (index >= 0)       //If exist, remove the date
      this.datesSelected.splice(index, 1);
    else   //a simple push
      this.datesSelected.push(date);
  }
  addRangeDate(fromDate: NgbDateStruct, toDate: NgbDateStruct) {
    //We get the getTime() of the dates from and to
    let from = new Date(fromDate.year + "-" + fromDate.month + "-" + fromDate.day).getTime();
    let to = new Date(toDate.year + "-" + toDate.month + "-" + toDate.day).getTime();
    for (let time = from; time <= to; time += (24 * 60 * 60 * 1000)) //add one day
    {
      let date = new Date(time);
      //javascript getMonth give 0 to January, 1, to February...
      this.addDate({ year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() });
    }
    // this.datesSelectedChange.emit(this.datesSelected);
  }
  //return true if is selected
  isDateSelected(date: NgbDateStruct) {
    return (this.datesSelected.findIndex(f => f.day == date.day && f.month == date.month && f.year == date.year) >= 0);
  }
  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
}

