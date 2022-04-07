export interface filter_value {
  newCases: boolean;
  cumulativeCases: boolean;
  newDeaths: boolean;
  cumulativeDeaths: boolean;
  newRecovered: boolean;
  cumulativeRecovered: boolean;
  location: string;
  startDate: string;
  endDate: string;
}

export interface fetched_data {
  province?: string;
  health_region?: string;
  cases: number;
  cumulative_cases: number;
  deaths: number;
  cumulative_deaths: number;
  recovered: number;
  cumulative_recovered?: number;
  date?: string;
}
