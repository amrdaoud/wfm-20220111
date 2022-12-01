import { DatePipe, DecimalPipe, PercentPipe } from "@angular/common";
import { ColumnDef } from "./shared/table-config";

export interface NeededVsAvailable {
  Day: Date;
  TimeMap: string;
  Forecast: number;
  Needed: number;
  Available: number;
}
export interface LeaderBoardwithSize {
  DataSize: number,
  Data: LeaderBoard[]
}
export interface LeaderBoard {
  Rank: number;
  AvatarUrl: string;
  StaffId: number;
  StaffName: string;
  Adherence: number;
}
export interface AdherenceByHos {
  HosId: number;
  HosName: string;
  Adherence: number;
}
export interface AdherenceFilter {
  DateFrom: Date;
  DateTo: Date;
  FilterType: string;
  FilterValue: string[];
  IsDaily: boolean;
  GroupBy: string;
}

export const filterGroupTypes = [
  {Name: 'Staff', View: 'Staff Member'},
  {Name: 'Transportation', View: 'Shift'},
  {Name: 'Hos', View: 'Head Of Section'}
];
export interface AdherenceReportData {
  HosId: number;
  HosName: string;
  StaffName: string;
  StaffId: number;
  Day: Date;
  TransportationRoute: string;
  PhonebyHour: number;
  ActivitybyHour: number;
  Adherance: number;
}

export const AdherenceReportColumns: ColumnDef[] = [
  {Name: 'Head Of Section', Property: 'HosName', Pipe: null, IsSort: true},
  {Name: 'Staff Member', Property: 'StaffName', Pipe: null, IsSort: true},
  {Name: 'Shift', Property: 'TransportationRoute', Pipe: null, IsSort: true},
  {Name: 'Day', Property: 'Day', Pipe: DatePipe, IsSort: true, PipeArgs: 'dd/MM/yyyy'},
  {Name: 'Phone Hours', Property: 'PhonebyHour', Pipe: DecimalPipe, IsSort: true},
  {Name: 'All Hours', Property: 'ActivitybyHour', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Adherence', Property: 'Adherance', Pipe: PercentPipe, IsSort: true}
];

export interface ActivitiesReportData {
  ActivityName: string;
  Intervals: IntervalCount
}

interface IntervalCount {
  [key: string]: number | null;
}
export const ActivitiesReportColumns: ColumnDef[] = [
  {Name: 'Activity', Property: 'ActivityName', Pipe: null, IsSort: true},
  {Name: '00:00', Property: 'Intervals', SubProperty: '00:00:00',Pipe: null, IsSort: false},
{Name: '00:15', Property: 'Intervals', SubProperty: '00:15:00',Pipe: null, IsSort: false},
{Name: '00:30', Property: 'Intervals', SubProperty: '00:30:00',Pipe: null, IsSort: false},
{Name: '00:45', Property: 'Intervals', SubProperty: '00:45:00',Pipe: null, IsSort: false},
{Name: '01:00', Property: 'Intervals', SubProperty: '01:00:00',Pipe: null, IsSort: false},
{Name: '01:15', Property: 'Intervals', SubProperty: '01:15:00',Pipe: null, IsSort: false},
{Name: '01:30', Property: 'Intervals', SubProperty: '01:30:00',Pipe: null, IsSort: false},
{Name: '01:45', Property: 'Intervals', SubProperty: '01:45:00',Pipe: null, IsSort: false},
{Name: '02:00', Property: 'Intervals', SubProperty: '02:00:00',Pipe: null, IsSort: false},
{Name: '02:15', Property: 'Intervals', SubProperty: '02:15:00',Pipe: null, IsSort: false},
{Name: '02:30', Property: 'Intervals', SubProperty: '02:30:00',Pipe: null, IsSort: false},
{Name: '02:45', Property: 'Intervals', SubProperty: '02:45:00',Pipe: null, IsSort: false},
{Name: '03:00', Property: 'Intervals', SubProperty: '03:00:00',Pipe: null, IsSort: false},
{Name: '03:15', Property: 'Intervals', SubProperty: '03:15:00',Pipe: null, IsSort: false},
{Name: '03:30', Property: 'Intervals', SubProperty: '03:30:00',Pipe: null, IsSort: false},
{Name: '03:45', Property: 'Intervals', SubProperty: '03:45:00',Pipe: null, IsSort: false},
{Name: '04:00', Property: 'Intervals', SubProperty: '04:00:00',Pipe: null, IsSort: false},
{Name: '04:15', Property: 'Intervals', SubProperty: '04:15:00',Pipe: null, IsSort: false},
{Name: '04:30', Property: 'Intervals', SubProperty: '04:30:00',Pipe: null, IsSort: false},
{Name: '04:45', Property: 'Intervals', SubProperty: '04:45:00',Pipe: null, IsSort: false},
{Name: '05:00', Property: 'Intervals', SubProperty: '05:00:00',Pipe: null, IsSort: false},
{Name: '05:15', Property: 'Intervals', SubProperty: '05:15:00',Pipe: null, IsSort: false},
{Name: '05:30', Property: 'Intervals', SubProperty: '05:30:00',Pipe: null, IsSort: false},
{Name: '05:45', Property: 'Intervals', SubProperty: '05:45:00',Pipe: null, IsSort: false},
{Name: '06:00', Property: 'Intervals', SubProperty: '06:00:00',Pipe: null, IsSort: false},
{Name: '06:15', Property: 'Intervals', SubProperty: '06:15:00',Pipe: null, IsSort: false},
{Name: '06:30', Property: 'Intervals', SubProperty: '06:30:00',Pipe: null, IsSort: false},
{Name: '06:45', Property: 'Intervals', SubProperty: '06:45:00',Pipe: null, IsSort: false},
{Name: '07:00', Property: 'Intervals', SubProperty: '07:00:00',Pipe: null, IsSort: false},
{Name: '07:15', Property: 'Intervals', SubProperty: '07:15:00',Pipe: null, IsSort: false},
{Name: '07:30', Property: 'Intervals', SubProperty: '07:30:00',Pipe: null, IsSort: false},
{Name: '07:45', Property: 'Intervals', SubProperty: '07:45:00',Pipe: null, IsSort: false},
{Name: '08:00', Property: 'Intervals', SubProperty: '08:00:00',Pipe: null, IsSort: false},
{Name: '08:15', Property: 'Intervals', SubProperty: '08:15:00',Pipe: null, IsSort: false},
{Name: '08:30', Property: 'Intervals', SubProperty: '08:30:00',Pipe: null, IsSort: false},
{Name: '08:45', Property: 'Intervals', SubProperty: '08:45:00',Pipe: null, IsSort: false},
{Name: '09:00', Property: 'Intervals', SubProperty: '09:00:00',Pipe: null, IsSort: false},
{Name: '09:15', Property: 'Intervals', SubProperty: '09:15:00',Pipe: null, IsSort: false},
{Name: '09:30', Property: 'Intervals', SubProperty: '09:30:00',Pipe: null, IsSort: false},
{Name: '09:45', Property: 'Intervals', SubProperty: '09:45:00',Pipe: null, IsSort: false},
{Name: '10:00', Property: 'Intervals', SubProperty: '10:00:00',Pipe: null, IsSort: false},
{Name: '10:15', Property: 'Intervals', SubProperty: '10:15:00',Pipe: null, IsSort: false},
{Name: '10:30', Property: 'Intervals', SubProperty: '10:30:00',Pipe: null, IsSort: false},
{Name: '10:45', Property: 'Intervals', SubProperty: '10:45:00',Pipe: null, IsSort: false},
{Name: '11:00', Property: 'Intervals', SubProperty: '11:00:00',Pipe: null, IsSort: false},
{Name: '11:15', Property: 'Intervals', SubProperty: '11:15:00',Pipe: null, IsSort: false},
{Name: '11:30', Property: 'Intervals', SubProperty: '11:30:00',Pipe: null, IsSort: false},
{Name: '11:45', Property: 'Intervals', SubProperty: '11:45:00',Pipe: null, IsSort: false},
{Name: '12:00', Property: 'Intervals', SubProperty: '12:00:00',Pipe: null, IsSort: false},
{Name: '12:15', Property: 'Intervals', SubProperty: '12:15:00',Pipe: null, IsSort: false},
{Name: '12:30', Property: 'Intervals', SubProperty: '12:30:00',Pipe: null, IsSort: false},
{Name: '12:45', Property: 'Intervals', SubProperty: '12:45:00',Pipe: null, IsSort: false},
{Name: '13:00', Property: 'Intervals', SubProperty: '13:00:00',Pipe: null, IsSort: false},
{Name: '13:15', Property: 'Intervals', SubProperty: '13:15:00',Pipe: null, IsSort: false},
{Name: '13:30', Property: 'Intervals', SubProperty: '13:30:00',Pipe: null, IsSort: false},
{Name: '13:45', Property: 'Intervals', SubProperty: '13:45:00',Pipe: null, IsSort: false},
{Name: '14:00', Property: 'Intervals', SubProperty: '14:00:00',Pipe: null, IsSort: false},
{Name: '14:15', Property: 'Intervals', SubProperty: '14:15:00',Pipe: null, IsSort: false},
{Name: '14:30', Property: 'Intervals', SubProperty: '14:30:00',Pipe: null, IsSort: false},
{Name: '14:45', Property: 'Intervals', SubProperty: '14:45:00',Pipe: null, IsSort: false},
{Name: '15:00', Property: 'Intervals', SubProperty: '15:00:00',Pipe: null, IsSort: false},
{Name: '15:15', Property: 'Intervals', SubProperty: '15:15:00',Pipe: null, IsSort: false},
{Name: '15:30', Property: 'Intervals', SubProperty: '15:30:00',Pipe: null, IsSort: false},
{Name: '15:45', Property: 'Intervals', SubProperty: '15:45:00',Pipe: null, IsSort: false},
{Name: '16:00', Property: 'Intervals', SubProperty: '16:00:00',Pipe: null, IsSort: false},
{Name: '16:15', Property: 'Intervals', SubProperty: '16:15:00',Pipe: null, IsSort: false},
{Name: '16:30', Property: 'Intervals', SubProperty: '16:30:00',Pipe: null, IsSort: false},
{Name: '16:45', Property: 'Intervals', SubProperty: '16:45:00',Pipe: null, IsSort: false},
{Name: '17:00', Property: 'Intervals', SubProperty: '17:00:00',Pipe: null, IsSort: false},
{Name: '17:15', Property: 'Intervals', SubProperty: '17:15:00',Pipe: null, IsSort: false},
{Name: '17:30', Property: 'Intervals', SubProperty: '17:30:00',Pipe: null, IsSort: false},
{Name: '17:45', Property: 'Intervals', SubProperty: '17:45:00',Pipe: null, IsSort: false},
{Name: '18:00', Property: 'Intervals', SubProperty: '18:00:00',Pipe: null, IsSort: false},
{Name: '18:15', Property: 'Intervals', SubProperty: '18:15:00',Pipe: null, IsSort: false},
{Name: '18:30', Property: 'Intervals', SubProperty: '18:30:00',Pipe: null, IsSort: false},
{Name: '18:45', Property: 'Intervals', SubProperty: '18:45:00',Pipe: null, IsSort: false},
{Name: '19:00', Property: 'Intervals', SubProperty: '19:00:00',Pipe: null, IsSort: false},
{Name: '19:15', Property: 'Intervals', SubProperty: '19:15:00',Pipe: null, IsSort: false},
{Name: '19:30', Property: 'Intervals', SubProperty: '19:30:00',Pipe: null, IsSort: false},
{Name: '19:45', Property: 'Intervals', SubProperty: '19:45:00',Pipe: null, IsSort: false},
{Name: '20:00', Property: 'Intervals', SubProperty: '20:00:00',Pipe: null, IsSort: false},
{Name: '20:15', Property: 'Intervals', SubProperty: '20:15:00',Pipe: null, IsSort: false},
{Name: '20:30', Property: 'Intervals', SubProperty: '20:30:00',Pipe: null, IsSort: false},
{Name: '20:45', Property: 'Intervals', SubProperty: '20:45:00',Pipe: null, IsSort: false},
{Name: '21:00', Property: 'Intervals', SubProperty: '21:00:00',Pipe: null, IsSort: false},
{Name: '21:15', Property: 'Intervals', SubProperty: '21:15:00',Pipe: null, IsSort: false},
{Name: '21:30', Property: 'Intervals', SubProperty: '21:30:00',Pipe: null, IsSort: false},
{Name: '21:45', Property: 'Intervals', SubProperty: '21:45:00',Pipe: null, IsSort: false},
{Name: '22:00', Property: 'Intervals', SubProperty: '22:00:00',Pipe: null, IsSort: false},
{Name: '22:15', Property: 'Intervals', SubProperty: '22:15:00',Pipe: null, IsSort: false},
{Name: '22:30', Property: 'Intervals', SubProperty: '22:30:00',Pipe: null, IsSort: false},
{Name: '22:45', Property: 'Intervals', SubProperty: '22:45:00',Pipe: null, IsSort: false},
{Name: '23:00', Property: 'Intervals', SubProperty: '23:00:00',Pipe: null, IsSort: false},
{Name: '23:15', Property: 'Intervals', SubProperty: '23:15:00',Pipe: null, IsSort: false},
{Name: '23:30', Property: 'Intervals', SubProperty: '23:30:00',Pipe: null, IsSort: false},
{Name: '23:45', Property: 'Intervals', SubProperty: '23:45:00',Pipe: null, IsSort: false}

];
