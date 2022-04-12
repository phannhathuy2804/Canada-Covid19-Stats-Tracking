import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataManagerService } from '../data-manager.service';
import { FilterService } from '../filter.service';
import { Saving_format } from '../utility/types';

@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.css'],
})
export class HistoryTableComponent implements OnInit {
  history_data: Saving_format[] = [];
  constructor(
    private http: HttpClient,
    private filter_service: FilterService,
    private saving_service: DataManagerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let d: any;
    this.saving_service.getHistory().subscribe((data) => {
      d = data;
      this.history_data = d.map((e) => {
        return e.data;
      });
      console.log(this.history_data);
    });
  }

  onDelete(e: Saving_format): void {
    console.log(e.id);
    this.saving_service.DeleteHistory(e).subscribe((data) => {
      this.history_data.filter((element) => {
        element.id != e.id;
        window.location.reload();
      });
    });
  }

  onDisplay(e: Saving_format): void {
    this.filter_service.filter_data.cases = false;
    this.filter_service.filter_data.cumulative_cases = false;
    this.filter_service.filter_data.deaths = false;
    this.filter_service.filter_data.cumulative_deaths = false;
    this.filter_service.filter_data.recovered = false;
    this.filter_service.filter_data.cumulative_recovered = false;

    if (e.stats.includes('cases')) {
      this.filter_service.filter_data.cases = true;
    }
    if (e.stats.includes('cumulative_cases')) {
      this.filter_service.filter_data.cumulative_cases = true;
    }
    if (e.stats.includes('deaths')) {
      this.filter_service.filter_data.deaths = true;
    }
    if (e.stats.includes('cumulative_deaths')) {
      this.filter_service.filter_data.cumulative_deaths = true;
    }
    if (e.stats.includes('recovered')) {
      this.filter_service.filter_data.recovered = true;
    }
    if (e.stats.includes('cumulative_recovered')) {
      this.filter_service.filter_data.cumulative_recovered = true;
    }
    this.router.navigateByUrl('/');
  }
}
