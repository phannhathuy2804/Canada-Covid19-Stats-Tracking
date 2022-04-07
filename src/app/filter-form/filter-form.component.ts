import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter_value } from '../utility/types';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.css'],
})
export class FilterFormComponent implements OnInit {
  @Output()
  submitFilter = new EventEmitter();

  filter!: FormGroup;
  d: any;
  newDataArr: any[] = [];

  constructor(
    private http: HttpClient,
    private filter_service: FilterService
  ) {}

  ngOnInit(): void {
    let date: Date = new Date();
    let recentDate: Date = new Date(date);
    recentDate.setDate(date.getDate() - 1);
    let dateString: string = recentDate.toISOString().split('T')[0];

    this.filter = new FormGroup({
      newCases: new FormControl(true),
      cumulativeCases: new FormControl(false),
      newDeaths: new FormControl(true),
      cumulativeDeaths: new FormControl(false),
      newRecovered: new FormControl(true),
      cumulativeRecovered: new FormControl(false),
      location: new FormControl('prov'),
      startDate: new FormControl(recentDate.toISOString().split('T')[0]),
      endDate: new FormControl(recentDate.toISOString().split('T')[0]),
    });
  }

  onSubmit(filterData: any): void {
    if (Date.parse(filterData.startDate) > Date.parse(filterData.endDate)) {
      window.alert('Start date must equal or less than end date');
    } else {
      this.filter_service.filter_data.newCases = <boolean>filterData.newCases;
      this.filter_service.filter_data.cumulativeCases = <boolean>(
        filterData.cumulativeCases
      );
      this.filter_service.filter_data.newDeaths = <boolean>filterData.newDeaths;
      this.filter_service.filter_data.cumulativeDeaths = <boolean>(
        filterData.cumulativeDeaths
      );
      this.filter_service.filter_data.newRecovered = <boolean>(
        filterData.newRecovered
      );
      this.filter_service.filter_data.cumulativeRecovered = <boolean>(
        filterData.cumulativeRecovered
      );
      this.filter_service.filter_data.location = <string>filterData.location;
      this.filter_service.filter_data.startDate = <string>filterData.startDate;
      this.filter_service.filter_data.endDate = <string>filterData.endDate;
      this.submitFilter.emit(this.filter_service.filter_data);
    }
  }
}
