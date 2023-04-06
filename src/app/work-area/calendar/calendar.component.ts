import { stringList } from 'aws-sdk/clients/datapipeline';
import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { EveryDayModel } from './models/everydaymodel';
import { Utils } from './custom/Utils';
import { QuarterlyModel } from './models/quarterlyModel';
import { NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CalenderModel } from './models/calender';
import { OportunityInstance } from './models/oppertunityInstance';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  @Output() public calendarChanged = new EventEmitter();

  @Input() calendarData: any;

  public start_time = null;
  public end_time = null;
  public message = '';
  private selectedDate: string;
  private start_date = '';
  public session_type_name = 'One Time';
  public session_type_id = '1';

  startMeridians: any;
  endMeridians: any;

  public sessionObj: any[] = [
    { id: '1', name: 'One Time' },
    { id: '2', name: 'Everyday' },
    { id: '3', name: 'Weekly' },
    { id: '4', name: 'Bi-weekly' },
    { id: '5', name: 'Monthly' },
    { id: '6', name: 'Quarterly' },
    { id: '7', name: 'Half Yearly' },
    { id: '8', name: 'Annually' }
  ];

  calendarModel: CalenderModel = <CalenderModel>{};
  oportunityInstanceModel: OportunityInstance = <OportunityInstance>{};
  everyDayModel: EveryDayModel = <EveryDayModel>{};
  quarterlyModel: QuarterlyModel = <QuarterlyModel>{};
  public monthlyCalendarObj: Array<CalenderModel>;
  public annuallyCalendarObj: Array<CalenderModel>;
  public weeklyCalendarObj: Array<CalenderModel>;
  public biWeeklyCalendarObj: Array<CalenderModel>;
  public everyDayCalendarObj: Array<CalenderModel>;
  public quartValidation = true;
  public halfValidation = true;

  public dateValidationFlag = false;
  public mainErrorMsg: String = '';

  calendarDaysObj: any;
  everyDaycalendarDaysObj: any;
  weeklycalendarDaysObj: any;
  byWeeklycalendarDaysObj: any;

  anualcalendarDaysObj: any;
  monthlyCalObj: any;
  quaterlyCalendarObj: any;
  halfYearlyCalObj: any;
  calendarInput: any;

  utilsObj: Utils = new Utils(this.datePipe);

  constructor(public datePipe: DatePipe) {
    this.start_date = this.start_date;
  }

  ngOnInit() {
    //console.log("In Calendar" + this.calendarData); // logs undefined

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.calendarData && changes.calendarData.currentValue) {
      var calArr = changes.calendarData.currentValue;
      // console.log("cal values--->" + JSON.stringify(calArr));

      if (calArr.session_type_id == "1") {
        this.session_type_id = '1';
        this.calendarDaysObj = calArr.days;
      } else if (calArr.session_type_id == "2") {
        this.session_type_id = '2';
        this.everyDaycalendarDaysObj = calArr.days;
      } else if (calArr.session_type_id == "3") {
        this.session_type_id = '3';
        this.weeklycalendarDaysObj = calArr;
      }
      else if (calArr.session_type_id == "4") {
        this.session_type_id = '4';
        this.byWeeklycalendarDaysObj = calArr;
      }
      else if (calArr.session_type_id == "5") {
        this.session_type_id = '5';
        this.monthlyCalObj = calArr.days;
      }
      else if (calArr.session_type_id == "6") {
        this.session_type_id = '6';
        this.quaterlyCalendarObj = calArr.days;
      }
      else if (calArr.session_type_id == "7") {
        this.session_type_id = '7';
        this.halfYearlyCalObj = calArr.days;
      }
      else if (calArr.session_type_id == "8") {
        this.session_type_id = '8';
        this.anualcalendarDaysObj = calArr.days;
      }

      setTimeout(() => {
        this.setDate(calArr.session_start_time, true);
      }, 200);

      setTimeout(() => {
        this.setDate(calArr.session_completion_time, false);
      }, 200);
    }

  }

  private setDate(timeString: string, isStartTime: boolean) {
    var reqTime: string[] = timeString.split(' ');
    var finalTime: string[] = reqTime[0].split(':');

    if (isStartTime) {
      this.start_time = new Date();
      this.start_time.setHours(parseInt(finalTime[0]));
      this.start_time.setMinutes(parseInt(finalTime[1]));
      // this.startMeridians = reqTime[1];
    } else {
      this.end_time = new Date();
      this.end_time.setHours(parseInt(finalTime[0]));
      this.end_time.setMinutes(parseInt(finalTime[1]));
      // this.endMeridians = reqTime[1];
    }


  }

  // for radio button handler
  private handleChange(event) {
    var calArr = {};
    const index = this.sessionObj.findIndex((ds: any) => {
      return ds.id + '' === event.target.id;
    });

    if (index > -1) {
      this.session_type_id = this.sessionObj[index].id;
      this.session_type_name = this.sessionObj[index].name;
    }
    this.start_time = null;
    this.end_time = null;
    this.message = null;


    if (this.session_type_id !== '7') {
      this.halfValidation = true;
    }
    if (this.session_type_id !== '6') {
      this.quartValidation = true;
    }

    this.mainErrorMsg = '';
    this.dateValidationFlag = false;
  }

  private dateChangedHandler(selectedDate: string) {
    this.selectedDate = selectedDate;
  }

  private everyDateChangedHandler(everyDayCalendarObj: Array<CalenderModel>) {
    this.everyDayCalendarObj = everyDayCalendarObj;
  }

  private quarterlyDateChangedHandler(quarterlyModel: QuarterlyModel) {
    this.quarterlyModel = quarterlyModel;
  }

  private halfYearlyDateChangedHandler(quarterlyModel: QuarterlyModel) {
    this.quarterlyModel = quarterlyModel;
  }

  private monthlyCalendarChangeHandler(monthlyCalendarObj: Array<CalenderModel>) {
    this.monthlyCalendarObj = monthlyCalendarObj;
  }
  private annuallyCalendarChangeHandler(annuallyCalendarObj: Array<CalenderModel>) {
    this.annuallyCalendarObj = annuallyCalendarObj;
  }

  private weeklyCalendarChangedHandler(weeklyCalendarObj: Array<CalenderModel>) {
    this.weeklyCalendarObj = weeklyCalendarObj;
  }

  private biWeeklyCalendarChangedHandler(biWeeklyCalendarObj: Array<CalenderModel>) {
    this.biWeeklyCalendarObj = biWeeklyCalendarObj;
  }

  public saveCalender(payload: NgForm): void {
    if (this.start_time === undefined || (this.start_time === null)) {
      this.mainErrorMsg = 'Please select start time !';
      this.dateValidationFlag = true;
    } else if (this.end_time === undefined || this.start_time === null) {
      this.mainErrorMsg = 'Please select end time';
      this.dateValidationFlag = true;
    } else if ((new Date(this.start_time).getTime()) >
      (new Date(this.end_time).getTime())) {
      this.mainErrorMsg = 'Start time is not greater that end time !';
      this.dateValidationFlag = true;
    } else {
      this.dateValidationFlag = false;
      this.mainErrorMsg = '';
      this.oportunityInstanceModel.session_type_id = this.session_type_id;
      this.oportunityInstanceModel.start_time = this.datePipe.transform(this.start_time, 'hh:mm:ss a');
      this.oportunityInstanceModel.end_time = this.datePipe.transform(this.end_time, 'hh:mm:ss a');
      if (this.session_type_id === '1') {
        console.log("onetime obj--->" + JSON.stringify(this.selectedDate));
        this.session_type_name = 'One Time';
        if (this.selectedDate !== undefined) {
          this.dateValidationFlag = false;
          const calenderModel1 = new CalenderModel();
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          calenderModel1.start_date = this.utilsObj.formatDate(this.selectedDate, 'dd-MMM-yyyy');
          calenderModel1.end_date = this.utilsObj.formatDate(this.selectedDate, 'dd-MMM-yyyy');
          const calArr = [];
          calArr.push(calenderModel1);
          this.oportunityInstanceModel.days = calArr;
          //this.message = JSON.stringify(this.oportunityInstanceModel);
        } else {
          this.mainErrorMsg = 'Please select date !';
          this.dateValidationFlag = true;
        }
      } else if (this.session_type_id === '2') {
        console.log("everyDay Call object obj--->" + JSON.stringify(this.everyDayCalendarObj));
        this.session_type_name = 'Everyday';
        if (this.everyDayCalendarObj === undefined || this.everyDayCalendarObj === null) {
          this.mainErrorMsg = 'Please select start Date and End Date Properly !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.everyDayCalendarObj;
          // this.message = JSON.stringify(this.oportunityInstanceModel);
        }
      } else if (this.session_type_id === '3') {
        this.session_type_name = 'Weekly';
        console.log("weekly obj--->" + JSON.stringify(this.weeklyCalendarObj));
        if (this.weeklyCalendarObj === undefined || this.weeklyCalendarObj === null) {
          this.mainErrorMsg = 'Please select week calendar days !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          if (this.weeklyCalendarObj.length > 0) {
            this.oportunityInstanceModel.days = this.weeklyCalendarObj;
            //this.message = JSON.stringify(this.oportunityInstanceModel);
          } else {
            // this.message = "";
            this.mainErrorMsg = 'Please select week calendar days !';
            this.dateValidationFlag = true;
          }

        }
      } else if (this.session_type_id === '4') {
        this.session_type_name = 'Bi-weekly';
        console.log("bi weekly obj--->" + JSON.stringify(this.biWeeklyCalendarObj));
        if (this.biWeeklyCalendarObj === undefined || this.biWeeklyCalendarObj === null) {
          this.mainErrorMsg = 'Please select biweek calendar days!';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          if (this.biWeeklyCalendarObj.length > 0) {
            this.oportunityInstanceModel.days = this.biWeeklyCalendarObj;
            //this.message = JSON.stringify(this.oportunityInstanceModel);
          } else {
            // this.message = "";
            this.mainErrorMsg = 'Please select biweek days';
            this.dateValidationFlag = true;
          }

        }
      } else if (this.session_type_id === '5') {
        this.session_type_name = 'Monthly';
        if (this.monthlyCalendarObj === undefined || this.monthlyCalendarObj === null) {
          this.mainErrorMsg = 'Please Enter Proper Details !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.monthlyCalendarObj;
          //this.message = JSON.stringify(this.oportunityInstanceModel);
        }



      } else if (this.session_type_id === '6') {
        this.session_type_name = 'Quarterly';
        const calArr = [];
        if (this.quarterlyModel.quarterlyModel.length > 0) {
          for (let i = 0; i < this.quarterlyModel.quarterlyModel.length; i++) {
            const calenderModel = new CalenderModel();
            calenderModel.start_date = this.quarterlyModel.quarterlyModel[i].start_date;
            calenderModel.end_date = this.quarterlyModel.quarterlyModel[i].end_date;
            calArr.push(calenderModel);
          }
          this.oportunityInstanceModel.days = calArr;
          // this.message = JSON.stringify(this.oportunityInstanceModel);
        }
      } else if (this.session_type_id === '7') {
        this.session_type_name = 'Half Yearly';
        this.oportunityInstanceModel.session_type_name = this.session_type_name;
        const calArr = [];
        for (let i = 0; i < this.quarterlyModel.quarterlyModel.length; i++) {
          const calenderModel = new CalenderModel();
          calenderModel.start_date = this.quarterlyModel.quarterlyModel[i].start_date;
          calenderModel.end_date = this.quarterlyModel.quarterlyModel[i].end_date;
          calArr.push(calenderModel);
        }
        this.oportunityInstanceModel.days = calArr;
        if (calArr.length > 0) {
          this.halfValidation = true;
          // this.message = JSON.stringify(this.oportunityInstanceModel);
        } else {
          this.halfValidation = false;
          //this.message = "";//JSON.stringify(this.oportunityInstanceModel);
        }

      } else if (this.session_type_id === '8') {
        this.session_type_name = 'Annually';
        console.log("anually object obj--->" + JSON.stringify(this.annuallyCalendarObj));
        if (this.annuallyCalendarObj === undefined || this.annuallyCalendarObj === null) {
          this.mainErrorMsg = 'Please Enter Proper Details !';
          this.dateValidationFlag = true;
        } else {
          this.dateValidationFlag = false;
          this.oportunityInstanceModel.session_type_name = this.session_type_name;
          this.oportunityInstanceModel.days = [];
          this.oportunityInstanceModel.days = this.annuallyCalendarObj;
          //this.message = JSON.stringify(this.oportunityInstanceModel);
        }

      }
    }
    this.calendarChanged.emit(this.oportunityInstanceModel);

  }
}
