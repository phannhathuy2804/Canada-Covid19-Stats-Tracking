import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FetchDataService } from '../fetch-data.service';
import { fetched_data } from '../utility/types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-data-table',
  templateUrl: './main-data-table.component.html',
  styleUrls: ['./main-data-table.component.css'],
})
export class MainDataTableComponent implements OnInit {
  @Input() DataArr: fetched_data[] = [];

  constructor(private http: HttpClient, private data: FetchDataService) {}

  ngOnInit(): void {}
}
