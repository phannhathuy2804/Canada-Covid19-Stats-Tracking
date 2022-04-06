import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface initData {
  province: string;
  cases: number;
  deaths: number;
  recovered: number;
  date: string;
}

@Component({
  selector: 'app-main-data-table',
  templateUrl: './main-data-table.component.html',
  styleUrls: ['./main-data-table.component.css'],
})
export class MainDataTableComponent implements OnInit {
  date: Date = new Date();
  d: any;
  initDataArr: initData[] = [];
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    let date: Date = new Date();

    let recentDate: Date = new Date(date);
    recentDate.setDate(date.getDate() - 1);
    let dateString: string = recentDate.toISOString().split('T')[0];
    console.log(dateString);
    let url: string = `https://api.opencovid.ca/summary?date=${dateString}`;
    this.http.get<Object>(url).subscribe((data) => {
      console.log(data);
      this.d = data;
      this.initDataArr = this.d.summary.map((e: initData) => e);
      console.log(this.initDataArr);
    });
  }
}
