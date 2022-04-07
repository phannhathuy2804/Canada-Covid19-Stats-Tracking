import { Component, OnInit } from '@angular/core';
import { FetchDataService } from './fetch-data.service';
import { FilterService } from './filter.service';
import { fetched_data, filter_value } from './utility/types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Covid19 Stats Tracking';
  filterValue: filter_value;
  d: any;
  DataArr: fetched_data[] = [];

  constructor(
    private filter_service: FilterService,
    private data: FetchDataService
  ) {
    this.filterValue = this.filter_service.filter_data;
  }

  ngOnInit(): void {
    console.log(this.filter_service.filter_data);
    this.data.fetch_data().subscribe((data) => {
      this.d = data;
      this.DataArr = this.d.summary.map((e: fetched_data) => e);
      console.log(this.DataArr);
    });
  }
  onSubmitFilter(event: any): void {
    console.log(this.filter_service.filter_data);
    this.data.fetch_data().subscribe((data) => {
      this.d = data;
      this.DataArr = this.d.summary.map((e: fetched_data) => e);
      console.log(this.DataArr);
    });
  }
}
