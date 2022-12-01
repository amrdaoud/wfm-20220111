import { DatePipe, DecimalPipe } from "@angular/common";
import { ColumnDef } from "./shared/table-config";

export interface Schedule {
  Id: number;
  Name:string;
  StartDate: Date;
  EndDate: Date;
  CreatedBy: string;
  CreateDate: Date;
  UpdatedBy: string;
  UpdateDate: string;
  IsPublish: boolean;
  ForecastId: number | null,
  HaveAttandance: boolean;
  // IsDeleted: false,
  // DailyAttendances: null,
  // DayOffOptions: null,
  // BreakTypeOptions: null,
  // ForeCastings: null,
  // ScheduleDetails: null
}
export interface ShiftRule {
  Id: number;
  StartAfter: number;
  EndBefore: number;
  BreakBetween: number;
}

export const scheduleColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Start Date', Property: 'StartDate', Pipe: DatePipe,PipeArgs: 'dd/MM/yyyy', IsSort: true},
  {Name: 'End Date', Property: 'EndDate', Pipe: DatePipe,PipeArgs: 'dd/MM/yyyy', IsSort: true},
  {Name: 'Publish?', Property: 'IsPublish', Pipe: null, IsSort: true},
];

export const defaultRule: ShiftRule = {Id: 0, StartAfter: 4, EndBefore: 4, BreakBetween: 4};

export interface ScheduleWithRules {
  ScheduleData: Schedule[];
  ShiftRuleData: ShiftRule;
}
export interface ScheduleWithRulesBinding {
  ScheduleData: Schedule;
  ShiftRuleData: ShiftRule;
}

export interface OneScheduleWithRules {
  ScheduleData: Schedule;
  ShiftRuleData: ShiftRule;
}

export interface ScheduleSummary {
  TimeMap: string;
  IntervalId: number;
  Tolerance: number;
  AverageNeeded: number;
  AverageAvailable: number;
}

export interface ActiveSchedule {
  Schedule: Schedule;
  AttendanceStaffCount: number;
}

export interface RecommendAll {
  IntervalId: number;
  Tolerance: number;
}
