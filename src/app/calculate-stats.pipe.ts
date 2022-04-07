import { Pipe, PipeTransform } from '@angular/core';
import { fetched_data } from './utility/types';

@Pipe({
  name: 'calculateStatsProvincial',
})
export class CalculateStatsProvincialPipe implements PipeTransform {
  transform(dataArr: fetched_data[], loc_option: string): any {
    let final_Arr: fetched_data[] = [];
    switch (loc_option) {
      case 'canada': {
        final_Arr = federal_stats(dataArr);
        break;
      }
      case 'prov': {
        final_Arr = provincial_stats(dataArr);
        break;
      }
      case 'hr': {
        final_Arr = hr_stats(dataArr);
        break;
      }
      default: {
        final_Arr = provincial_stats(dataArr);
        break;
      }
    }
    return final_Arr;
  }
}

function federal_stats(dataArr_fed: fetched_data[]) {
  let temp_Arr: fetched_data[] = [];
  let final_Arr: fetched_data[] = [];

  let initValue: fetched_data = {
    cases: 0,
    cumulative_cases: 0,
    deaths: 0,
    cumulative_deaths: 0,
    recovered: 0,
    cumulative_recovered: 0,
  };
  final_Arr.push(
    dataArr_fed.reduce(
      (
        prev_element: fetched_data,
        curr_element: fetched_data
      ): fetched_data => {
        let temp_obj: fetched_data = {
          province: curr_element.province,
          cases: prev_element.cases + curr_element.cases,
          cumulative_cases: curr_element.cumulative_cases,
          deaths: prev_element.deaths + curr_element.deaths,
          cumulative_deaths: curr_element.cumulative_deaths,
          recovered: prev_element.recovered + curr_element.recovered,
          cumulative_recovered: curr_element.cumulative_recovered,
        };
        return temp_obj;
      },
      initValue
    )
  );

  console.log(final_Arr);

  return final_Arr;
}

function provincial_stats(dataArr_prov: fetched_data[]) {
  let new_Arr: fetched_data[][] = [];
  let temp_Arr: fetched_data[] = [];
  let final_Arr: fetched_data[] = [];
  dataArr_prov.forEach((element) => {
    if (temp_Arr.length == 0) {
      temp_Arr.push(element);
    } else if (element.province == temp_Arr[0].province) {
      temp_Arr.push(element);
    } else {
      new_Arr.push(temp_Arr);
      temp_Arr = [];
      temp_Arr.push(element);
    }
  });
  new_Arr.forEach((sub_Array) => {
    let initValue: fetched_data = {
      cases: 0,
      cumulative_cases: 0,
      deaths: 0,
      cumulative_deaths: 0,
      recovered: 0,
      cumulative_recovered: 0,
    };
    final_Arr.push(
      sub_Array.reduce(
        (
          prev_element: fetched_data,
          curr_element: fetched_data
        ): fetched_data => {
          let temp_obj: fetched_data = {
            province: curr_element.province,
            cases: prev_element.cases + curr_element.cases,
            cumulative_cases: curr_element.cumulative_cases,
            deaths: prev_element.deaths + curr_element.deaths,
            cumulative_deaths: curr_element.cumulative_deaths,
            recovered: prev_element.recovered + curr_element.recovered,
            cumulative_recovered: curr_element.cumulative_recovered,
          };
          return temp_obj;
        },
        initValue
      )
    );
  });
  console.log(final_Arr);

  return final_Arr;
}

function hr_stats(dataArr_hr: fetched_data[]) {
  let new_Arr: fetched_data[][] = [];
  let temp_Arr: fetched_data[] = [];
  let final_Arr: fetched_data[] = [];
  dataArr_hr.forEach((element) => {
    if (temp_Arr.length == 0) {
      temp_Arr.push(element);
    } else if (element.health_region == temp_Arr[0].health_region) {
      temp_Arr.push(element);
    } else {
      new_Arr.push(temp_Arr);
      temp_Arr = [];
      temp_Arr.push(element);
    }
  });
  new_Arr.forEach((sub_Array) => {
    let initValue: fetched_data = {
      cases: 0,
      cumulative_cases: 0,
      deaths: 0,
      cumulative_deaths: 0,
      recovered: 0,
      cumulative_recovered: 0,
    };
    final_Arr.push(
      sub_Array.reduce(
        (
          prev_element: fetched_data,
          curr_element: fetched_data
        ): fetched_data => {
          let temp_obj: fetched_data = {
            province: curr_element.province,
            health_region: curr_element.health_region,
            cases: prev_element.cases + curr_element.cases,
            cumulative_cases: curr_element.cumulative_cases,
            deaths: prev_element.deaths + curr_element.deaths,
            cumulative_deaths: curr_element.cumulative_deaths,
            recovered: prev_element.recovered + curr_element.recovered,
            cumulative_recovered: curr_element.cumulative_recovered,
          };
          return temp_obj;
        },
        initValue
      )
    );
  });
  console.log(final_Arr);

  return final_Arr;
}
