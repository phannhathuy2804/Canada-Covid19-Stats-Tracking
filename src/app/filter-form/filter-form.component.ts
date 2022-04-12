import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { filter_value, Saving_format } from '../utility/types';
import { FilterService } from '../filter.service';
import { DataManagerService } from '../data-manager.service';

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
    private filter_service: FilterService,
    private saving_service: DataManagerService
  ) {}

  ngOnInit(): void {
    let date: Date = new Date();
    let recentDate: Date = new Date(date);
    recentDate.setDate(date.getDate() - 1);
    let dateString: string = recentDate.toISOString().split('T')[0];

    this.filter = new FormGroup({
      newCases: new FormControl(this.filter_service.filter_data.cases),
      cumulativeCases: new FormControl(
        this.filter_service.filter_data.cumulative_cases
      ),
      newDeaths: new FormControl(this.filter_service.filter_data.deaths),
      cumulativeDeaths: new FormControl(
        this.filter_service.filter_data.cumulative_deaths
      ),
      newRecovered: new FormControl(this.filter_service.filter_data.recovered),
      cumulativeRecovered: new FormControl(
        this.filter_service.filter_data.cumulative_recovered
      ),
      location: new FormControl(this.filter_service.filter_data.location),
      startDate: new FormControl(this.filter_service.filter_data.startDate),
      endDate: new FormControl(this.filter_service.filter_data.endDate),
    });
  }

  onSubmit(filterData: any): void {
    if (Date.parse(filterData.startDate) > Date.parse(filterData.endDate)) {
      window.alert('Start date must equal or less than end date');
    } else {
      this.filter_service.filter_data.cases = <boolean>filterData.newCases;
      this.filter_service.filter_data.cumulative_cases = <boolean>(
        filterData.cumulativeCases
      );
      this.filter_service.filter_data.deaths = <boolean>filterData.newDeaths;
      this.filter_service.filter_data.cumulative_deaths = <boolean>(
        filterData.cumulativeDeaths
      );
      this.filter_service.filter_data.recovered = <boolean>(
        filterData.newRecovered
      );
      this.filter_service.filter_data.cumulative_recovered = <boolean>(
        filterData.cumulativeRecovered
      );
      this.filter_service.filter_data.location = <string>filterData.location;
      this.filter_service.filter_data.startDate = <string>filterData.startDate;
      this.filter_service.filter_data.endDate = <string>filterData.endDate;
      this.submitFilter.emit(this.filter_service.filter_data);
    }
  }

  onSave(): void {
    this.onSubmit(this.filter.value);
    let saving_data: Saving_format = {
      id: Date.now(),
      time_saved: '',
      stats: [],
      location: [],
      time: [],
    };
    saving_data.time_saved = new Date().toISOString();
    for (let i in this.filter_service.filter_data) {
      if (this.filter_service.filter_data[i] == true)
        saving_data.stats.push(i.toString());
    }
    if (this.filter_service.filter_data.location == 'canada') {
      saving_data.location.push('canada');
    } else if (this.filter_service.filter_data.location == 'prov') {
      saving_data.location.push('prov');
    } else this.filter_service.filter_data.location == 'health_region';
    saving_data.time.push(this.filter_service.filter_data.startDate);
    saving_data.time.push(this.filter_service.filter_data.endDate);
    this.saving_service.PostHitory(saving_data).subscribe((data) => {
      alert('This filter has been saved!');
      console.log(data);
    });
  }
}
