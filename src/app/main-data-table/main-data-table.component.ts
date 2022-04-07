import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from '../fetch-data.service';
import { fetched_data, filter_value } from '../utility/types';
import { Observable } from 'rxjs';
import { FilterService } from '../filter.service';

@Component({
  selector: 'app-main-data-table',
  templateUrl: './main-data-table.component.html',
  styleUrls: ['./main-data-table.component.css'],
})
export class MainDataTableComponent implements OnInit {
  @Input() DataArr: fetched_data[] = [];
  filter_data: filter_value;
  constructor(private http: HttpClient, private filter: FilterService) {
    this.filter_data = filter.filter_data;
  }

  ngOnInit(): void {}

  isLocHR(): boolean {
    return this.filter_data.location == 'hr';
  }
  isNaN(value: number): boolean {
    return Number.isNaN(value);
  }
}
