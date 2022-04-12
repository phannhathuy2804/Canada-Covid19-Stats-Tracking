import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from '../fetch-data.service';
import { fetched_data, filter_value } from '../utility/types';
import { Observable } from 'rxjs';
import { FilterService } from '../filter.service';
import { CalculateStatsProvincialPipe } from '../calculate-stats.pipe';

@Component({
  selector: 'app-main-data-table',
  templateUrl: './main-data-table.component.html',
  styleUrls: ['./main-data-table.component.css'],
})
export class MainDataTableComponent implements OnInit {
  DataArr: fetched_data[] = [];
  filter_data: filter_value;
  booleanValue: any = false;
  calculated_Arr: fetched_data[] = [];
  d: any;

  constructor(
    private http: HttpClient,
    private filter_service: FilterService,
    private data: FetchDataService
  ) {
    this.filter_data = filter_service.filter_data;
  }

  ngOnInit(): void {
    this.data.fetch_data().subscribe((data) => {
      this.d = data;
      this.DataArr = this.d.summary.map((e: fetched_data) => e);
    });
  }

  isLocHR(): boolean {
    return this.filter_data.location == 'hr';
  }
  isNaN(value: number): boolean {
    return Number.isNaN(value);
  }
  sortFunction(colName: string, boolean: boolean) {
    let calculate_pipe = new CalculateStatsProvincialPipe();
    this.DataArr = calculate_pipe.transform(
      this.DataArr,
      this.filter_data.location
    );
    if (boolean == true) {
      this.DataArr.sort((a: any, b: any) =>
        a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;
    } else {
      this.DataArr.sort((a: any, b: any) =>
        a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0
      );
      this.booleanValue = !this.booleanValue;
    }
  }
  onSubmitFilter(event: any): void {
    console.log(this.filter_service.filter_data);
    this.data.fetch_data().subscribe((data) => {
      this.d = data;
      this.DataArr = this.d.summary.map((e: fetched_data) => e);
    });
  }
}
