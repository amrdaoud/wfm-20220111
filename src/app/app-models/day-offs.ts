import { DecimalPipe } from "@angular/common";
import { ColumnDef } from "./shared/table-config";

export interface AttendanceType {
  Id: number;
  Name: string;
  IsAbsence: boolean;
  Hidden: boolean;
}

export const attendanceTypeColumnsOld: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Absence?', Property: 'IsAbsence', Pipe: null, IsSort: true}
];


export interface UserChoice {
  StaffMemberName: string;
  StaffMemberId: number;
  ScheduleName: string;
  ScheduleId: number;
  AttendenceTypeName: string;
  AttendenceTypeId: number;
  SublocationName: string;
  SublocationId: number;
  ShiftName: string;
  ShiftId: number;
  DayOption1: DayOption;
  DayOption2: DayOption;
  DayOption3: DayOption;
  DayOption4: DayOption;
}
export interface UserChoiceBinding {
  StaffMemberId: number;
  ScheduleId: number;
  AttendenceTypeId: number;
  DayOption1: DayOption;
  DayOption2: DayOption;
  DayOption3: DayOption;
}
export interface DayOption {
  Id: number;
  Days: string[];
  IsApproved: boolean;
}

export interface AttendanceApprovalModel {
  StaffMemberId: number;
  ScheduleId: number;
  AcceptedBreakTypeOption: number;
  ShiftId: number;
  AccepedDayOffInfo: {Id: number, Day1: string, Day2: string}
}
export class DayOffReportData {
  constructor(weekDay: string) {
    this.WeekDay = weekDay;
    this.ShiftData = new Array<DayOffReportDataShift>();
    this.TotalCount = 0;
  }
  public WeekDay: string;
  public ShiftData: DayOffReportDataShift[];
  public TotalCount: number;
}
export class DayOffReportDataShift {
  constructor(
    public ShiftName: string,
    public Count: number
    ){}
}

export interface UploadData {
  EmployeeId: string;
  Transportation: string;
  Attendance: string;
  DayOne: string;
  DayTwo: string;
  Valid: boolean;
}
export interface UploadDataGuard {
  EmployeeId: string;
  Sublocation: string;
  Shift: string;
  DayOffs: string;
  Valid: boolean;
}

