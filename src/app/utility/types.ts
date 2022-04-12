export interface filter_value {
  cases: boolean;
  cumulative_cases: boolean;
  deaths: boolean;
  cumulative_deaths: boolean;
  recovered: boolean;
  cumulative_recovered: boolean;
  location: string;
  startDate: string;
  endDate: string;
  [key: string]: any;
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
  [key: string]: any;
}

export interface Saving_format {
  id: number;
  time_saved: string;
  stats: string[];
  location: string[];
  time: string[];
}
