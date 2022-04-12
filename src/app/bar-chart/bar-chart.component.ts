import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CalculateStatsProvincialPipe } from '../calculate-stats.pipe';
import { FilterService } from '../filter.service';
import { fetched_data, filter_value } from '../utility/types';

interface dataset_obj {
  data: number[];
  label: string;
}

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit, OnChanges {
  @Input()
  DataArr: fetched_data[] = [];

  @ViewChild(BaseChartDirective)
  public chart!: BaseChartDirective;

  filter_data: filter_value;

  public barChartOptions: ChartOptions = {
    responsive: true,
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: [
      'newCases',
      'cumulativeCases',
      'newDeaths',
      'cumulativeDeaths',
      'newRecovered',
      'cumulativeRecovered',
    ],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  constructor(filter_data: FilterService) {
    this.filter_data = filter_data.filter_data;
  }
  ngOnChanges(changes: SimpleChanges): void {
    let filter_stats: any[] = [];
    for (const key in this.filter_data) {
      if (this.filter_data[key] == true) {
        filter_stats.push(key);
      }
    }
    console.log(filter_stats);
    type ObjectKey = keyof typeof this.DataArr;

    let stat_calculator = new CalculateStatsProvincialPipe();
    this.DataArr = stat_calculator.transform(
      this.DataArr,
      this.filter_data.location
    );
    this.barChartData.datasets = [];
    this.barChartData.labels = [];
    for (let i = 0; i < filter_stats.length; i++) {
      let temp_data_obj: dataset_obj = {
        data: [],
        label: '',
      };
      this.DataArr.forEach((element) => {
        if (i == 0) {
          if (this.filter_data.location == 'hr')
            this.barChartData.labels?.push(element.health_region);
          else this.barChartData.labels?.push(element.province);
        }
        temp_data_obj.data.push(element[filter_stats[i]]);
        temp_data_obj.label = filter_stats[i];
      });

      this.barChartData.datasets.push(temp_data_obj);
    }
    console.log(this.barChartData.datasets);

    this.chart.chart?.update();
  }
  ngOnInit(): void {}
}
