import { Injectable } from '@angular/core';
import { filter_value, fetched_data } from './utility/types';
import { HttpClient } from '@angular/common/http';
import { FilterService } from './filter.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchDataService {
  d: any;
  dataArr: fetched_data[] = [];
  constructor(private http: HttpClient, private filter: FilterService) {}

  fetch_data(): Observable<Object> {
    let url: string = `https://api.opencovid.ca/summary?loc=${this.filter.filter_data.location}&before=${this.filter.filter_data.endDate}&after=${this.filter.filter_data.startDate}`;
    return this.http.get<Object>(url);
    // .subscribe((data) => {
    //   this.d = data;
    //   this.dataArr = this.d.summary.map((e: fetched_data) => e);
    // });
  }
}
