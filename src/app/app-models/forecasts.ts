import { DecimalPipe, PercentPipe, DatePipe } from '@angular/common';
import { ColumnDef } from 'src/app/app-models/shared/table-config';
export interface Forecast {
  Id: number;
  Name: string;
  DurationTolerance: number;
  OfferedTolerance: number;
  ServiceLevel: number;
  ServiceTime: number;
  StartDate: Date;
  EndDate: Date;
  ExceptDates: string;
  IsSaved: boolean;
  ForecastDetails: ForecastDetail[];
}

export const forecastColumns: ColumnDef[] =[
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Start', Property: 'StartDate', Pipe: DatePipe, IsSort: true, PipeArgs: 'dd/MM/yyyy'},
  {Name: 'End', Property: 'EndDate', Pipe: DatePipe, IsSort: true, PipeArgs: 'dd/MM/yyyy'},
  {Name: 'Except', Property: 'ExceptDates', Pipe: 'LongString', IsSort: true, IsTooltip:true},
  {Name: 'Service .lvl', Property: 'ServiceLevel', Pipe: PercentPipe, IsSort: true},
  {Name: 'Service .sec', Property: 'ServiceTime', Pipe: null, IsSort: true},
  {Name: 'Duration .tol', Property: 'DurationTolerance', Pipe: PercentPipe, IsSort: true},
  {Name: 'Offered .tol', Property: 'OfferedTolerance', Pipe: PercentPipe, IsSort: true},
  {Name: 'Saved?', Property: 'IsSaved', Pipe: null, IsSort: true}

];


export interface ForecastDetail {
  Id: number;
  IntervalId: number;
  Interval: Interval;
  DayoffWeek: string;
  EmployeeCount: number;
}

export interface Interval {
  Id: number;
  TimeMap: string;
  OrderMap?: number;
  CoverMap?: number;
  Tolerance?: number;
}
export interface RecommendAllIntervalsModel {
  Id: number;
  Tolerance: number;
}
export interface ForecastDetailView {
  DayoffWeek: string;
  ForecastIntervals: ForecastDetailIntervals[];
}
export interface ForecastDetailIntervals {
  Id: number;
  IntervalId: number;
  TimeHour: string;
  TimeQuarter: string;
  EmployeeCount: number;
}

export interface ForecastBinding {
  Id: number;
  StartDate: Date;
  EndDate: Date;
  Name: string;
  ExceptDates: Date[];
  ServiceLevel: number;
  ServiceTime: number;
  DurationTolerance: number;
  OfferedTolerance: number;
}
