import { Component, OnInit, Output, EventEmitter, SimpleChanges, Input } from '@angular/core';
import * as _moment from 'moment';
import { CalenderModel } from '../models/calender';
const moment = (_moment as any).default ? (_moment as any).default : _moment;

@Component({
  selector: 'app-annually',
  templateUrl: './annually.component.html',
  styleUrls: ['./annually.component.css']
})
export class AnnuallyComponent implements OnInit {

  public selectDate: Date = null;
  public annuallyCalendarObj: Array<CalenderModel> = [];
  public endYearValidationFlag = true;
  public startEndYearBetweenValidationFlag = true;
  public dateValidationFlag = true;
  public startYear: number;
  public endYear: number;
  public endYearConditionValidationFlag = true;
  public startYearConditionValidationFlag = true;

  @Output() public annuallyCalendarChanged = new EventEmitter();
  @Input() public calendarInput: any;
  public year: string;
  currentYear: any;
  currentDate: any;

  constructor() {

  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.calendarInput && changes.calendarInput.currentValue) {
      setTimeout(() => {
        this.setAnualCalendarDays(changes.calendarInput.currentValue);
      }, 200);
    }

    //console.log("One time---->", changes); // logs undefined
  }

  private setAnualCalendarDays(data: any) {
    if (data.length > 0) {
      this.startYear = data[0].start_date.split('-')[0];
      this.endYear = data[data.length - 1].start_date.split('-')[0];
      this.selectDate = new Date(data[0].start_date);
      this.dateValidationFlag = false;
      console.log("start year and end year---->" + this.startYear + ",,,,," + this.endYear);
      this.startYearHandler("");
    }

  }

  handleSelectYear(event, id) {
    //console.log(event);
    this.year = event;
    if (id === 0) {
      this.startYear = parseInt(this.year, 10);
      this.startYearHandler(event);
    } else {
      this.endYear = parseInt(this.year, 10);
      this.endYearHandler(event);
    }

  }

  private startYearHandler(event) {

    if (this.startYear === undefined) {
      this.endYearValidationFlag = true;
    } else {
      if (this.endYear !== undefined) {
        if (this.endYear <= this.startYear) {
          this.startYearConditionValidationFlag = false;
          this.endYearValidationFlag = false;
        } else {
          this.startYearConditionValidationFlag = true;
        }
      } else {
        this.endYearValidationFlag = false;
      }
    }

    if (this.startYear !== undefined && this.endYear !== undefined && this.selectDate !== undefined) {
      this.selectDateHandler(event);
    }

  }
  private endYearHandler(event) {
    if (this.endYear === undefined) {
      this.dateValidationFlag = true;
    } else {
      if (this.endYear <= this.startYear) {
        this.dateValidationFlag = true;
        this.endYearConditionValidationFlag = false;
        this.startYearConditionValidationFlag = false;
        this.endYear = null;
      } else {
        this.endYearConditionValidationFlag = true;
        this.startYearConditionValidationFlag = true;
        this.dateValidationFlag = false;
      }
    }

    if (this.startYear !== undefined && this.endYear !== undefined && this.selectDate != undefined) {
      this.selectDateHandler(event);
    }
  }

  public selectDateHandler(event) {

    if (this.startYear === undefined && this.endYear === undefined) {
    } else if (this.selectDate !== null) {
      let currentDate: Date = new Date(moment(this.selectDate).format('YYYY-MMM-DD'));
      let currentYear = currentDate.getFullYear();
      this.annuallyCalendarObj = [];
      if ((this.startYear <= currentYear) && (this.endYear >= currentYear)) {
        this.startEndYearBetweenValidationFlag = true;
        for (let i = this.startYear; i <= this.endYear; i++) {
          let calDate = currentDate;
          let month = calDate.getMonth();
          let date = calDate.getDate();
          let selectedDateObj = new Date(i, month, date);
          // let dayObj = moment(selectedDateObj).format('YYYY-MMM-DD');
          let dayObj = moment(selectedDateObj).format('DD-MMM-YYYY');
          let calenderModel = new CalenderModel();
          calenderModel.start_date = dayObj;
          calenderModel.end_date = dayObj;
          this.annuallyCalendarObj.push(calenderModel);
          this.annuallyCalendarChanged.emit(this.annuallyCalendarObj)
        }
      } else {
        this.startEndYearBetweenValidationFlag = false;
      }
    }
  }
}
