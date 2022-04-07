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
    recentDate.setDate(date.getDate() - 1);
    let dateString: string = recentDate.toISOString().split('T')[0];

    this.filter_data = {
      newCases: true,
      cumulativeCases: false,
      newDeaths: true,
      cumulativeDeaths: false,
      newRecovered: true,
      cumulativeRecovered: false,
      location: 'prov',
      startDate: '',
      endDate: '',
    };
  }
}
