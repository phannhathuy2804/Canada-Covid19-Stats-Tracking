import { Component, OnInit } from '@angular/core';
import { FilterService } from './filter.service';
import { filter_value } from './utility/types';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Covid19 Stats Tracking';
  filterValue: filter_value;

  constructor(private filter_service: FilterService) {
    this.filterValue = this.filter_service.filter_data;
  }

  ngOnInit(): void {}
  onSubmitFilter(event: any): void {
    console.log(event);
    console.log(this.filter_service.filter_data);
  }
}
