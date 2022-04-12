import { Injectable } from '@angular/core';
import { filter_value } from './utility/types';
@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filter_data: filter_value;

  constructor() {
    let date: Date = new Date();
    let recentDate: Date = new Date(date);
    let recentDate2: Date = new Date(date);
    recentDate.setDate(date.getDate() - 1);
    recentDate2.setDate(date.getDate() - 2);
    let initDate2: string = recentDate2.toISOString().split('T')[0];

    let initDate: string = recentDate.toISOString().split('T')[0];
    this.filter_data = {
      cases: true,
      cumulative_cases: false,
      deaths: true,
      cumulative_deaths: false,
      recovered: true,
      cumulative_recovered: false,
      location: 'prov',
      startDate: initDate2,
      endDate: initDate,
    };
  }
}
