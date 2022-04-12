import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CalculateStatsProvincialPipe } from '../calculate-stats.pipe';
import { FetchDataService } from '../fetch-data.service';
import { FilterService } from '../filter.service';
import { fetched_data, filter_value } from '../utility/types';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css'],
})
export class GraphsComponent implements OnInit {
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
  onSubmitFilter(event: any): void {
    console.log(this.filter_service.filter_data);
    this.data.fetch_data().subscribe((data) => {
      this.d = data;
      this.DataArr = this.d.summary.map((e: fetched_data) => e);
      console.log(this.DataArr);
    });
  }
}
