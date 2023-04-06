import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-select-year',
  templateUrl: './select-year.component.html',
  styleUrls: ['./select-year.component.css']
})
export class SelectYearComponent implements OnInit {
  selectYears: any[] = [];
  public selectYearValide = true;

  public startYear = 1970;
  public endYear = 2040;
  public year: any;

  @Input() public childData: any

  ngOnChanges(changes: SimpleChanges) {
    //if (changes.calendarInput && changes.calendarInput.currentValue) {
    console.log("select year--->" + JSON.stringify(changes.childData.currentValue));
    setTimeout(() => {
      this.year = changes.childData.currentValue;
    }, 200);
    //}

    //console.log("One time---->", changes); // logs undefined
  }
  private getYears() {
    this.selectYears = [];
    for (let i = this.startYear; i < this.endYear; i++) {
      this.selectYears.push(i);
    }
  }

  constructor() { }
  ngOnInit() {
    this.getYears();
  }

  @Output() public yearsChanged = new EventEmitter();

  handleSelectYear(event) {
    this.yearsChanged.emit(event.target.value);
  }
}
