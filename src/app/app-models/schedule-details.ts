import { Interval } from "./forecasts";

export interface ScheduleByStaff {
  Id: number;
  Name: string;
  EmployeeId: number;
  ScheduleId: number;
  ScheduleName: string;
  ScheduleStartDate: Date;
  ScheduleEndDate: Date;
  DailyAttendances: DailyAttendance[];
}

export interface ScheduleDetailManipulate {
        DailyAttendanceId: number;
        IntervalId: number;
        ActivityId?: number;
        ActivityName?: string;
        ActivityColor?: string;
}

export interface ManipulateDetails {
    ActivityId: number;
    ScheduleDetailsManipulate: ScheduleDetailManipulate[];

}


export interface EditScheduleDetailsBinding  {
  ScheduleDetailsIds: number[];
  ActivityId: number;
}

export interface AddScheduleDetailsBinding {
        ScheduleId: number;
        AddScheduleDetails: AddScheduleDetail[];
        ActivityId: number;
    }
export interface AddScheduleDetail {
    DailyAttendanceId: number;
    IntervalId: number;
}
interface ScheduleDetailMap {
  [key: number]: ScheduleDetail | null;
}

export interface DailyAttendance {
  Id: number;
  Day: Date;
  HeadOfSectionName: string;
  HaveBackup: boolean;
  ScheduleDetails: ScheduleDetailMap;
}
export interface DailyAttendanceBackup {
  Id: number;
  Alias: Date;
  ActionTime: boolean;
  AttendanceType: string;
  ScheduleDetails: ScheduleDetailMap;
}

export interface ScheduleDetail {
  Id:number;
  IntervalId: number;
  ActivityId: number;
  ActivityColor: string;
  ActivityName: string;
  IntervalTimeMap: string;
  Duration: number;
}
export interface HourlyInterval {
  Hour: string;
  Quarters: QuarterInterval[];
}
export interface QuarterInterval {
  Quarter: string;
  IntervalId: number;
}

export interface ScheduleByDayWithSize {
  Result: ScheduleByDay;
  Size: number
}

export interface ScheduleByDay {
  Day: Date;
  ScheduleId: number;
  ScheduleName: string;
  ScheduleStartDate: Date;
  ScheduleEndDate: string;
  DailyAttendances: DailyScheduleAttendanceByStaff[];
}

export interface DailyScheduleAttendanceByStaff {
  Id: number;
  EmployeeId: number;
  AttendanceId: number
  Name: string;
  HeadOfSectionName: string;
  ScheduleId: number;
  ScheduleName: string;
  ScheduleStartDate: Date;
  ScheduleEndDate: string;
  ScheduleDetails: ScheduleDetailMap;
  // ScheduleDetailsAsObject: Map<number,ScheduleDetail>;
}

export interface DailyAttendanceByStaffWithSize {
  Result:  DailyAttendanceBySchedule;
  Size: number;
}
export interface DailyAttendanceBySchedule {
  ScheduleId: number;
  ScheduleName: string;
  DailyStaffs: DailyAttendanceByStaff[];
}

export interface DailyAttendanceByStaff {
  Id: number;
  Name: string;
  EmployeeId: number;
  ScheduleId: number;
  ScheduleName: string;
  ScheduleStartDate: Date;
  ScheduleEndDate: string;
  DailyAttendances:DailyAttendanceInfo[]
}
export interface DailyAttendanceInfo {
  Id: number;
  ShiftId: number;
  AttendanceTypeId: number;
  AttendanceTypeName: string;
  Day: Date;
  Color: string;
  TransportationName: string;
  TransportationArriveTime: string;
  TransportationDepartTime: string;
  HeadOfSectionName: string;
  HaveBackup: boolean;
  IsAbsence: boolean;
}
export const intervalList: Interval[] = [
  {Id:1,TimeMap:'00:00:00'},
{Id:2,TimeMap:'00:15:00'},
{Id:3,TimeMap:'00:30:00'},
{Id:4,TimeMap:'00:45:00'},
{Id:5,TimeMap:'01:00:00'},
{Id:6,TimeMap:'01:15:00'},
{Id:7,TimeMap:'01:30:00'},
{Id:8,TimeMap:'01:45:00'},
{Id:9,TimeMap:'02:00:00'},
{Id:10,TimeMap:'02:15:00'},
{Id:11,TimeMap:'02:30:00'},
{Id:12,TimeMap:'02:45:00'},
{Id:13,TimeMap:'03:00:00'},
{Id:14,TimeMap:'03:15:00'},
{Id:15,TimeMap:'03:30:00'},
{Id:16,TimeMap:'03:45:00'},
{Id:17,TimeMap:'04:00:00'},
{Id:18,TimeMap:'04:15:00'},
{Id:19,TimeMap:'04:30:00'},
{Id:20,TimeMap:'04:45:00'},
{Id:21,TimeMap:'05:00:00'},
{Id:22,TimeMap:'05:15:00'},
{Id:23,TimeMap:'05:30:00'},
{Id:24,TimeMap:'05:45:00'},
{Id:25,TimeMap:'06:00:00'},
{Id:26,TimeMap:'06:15:00'},
{Id:27,TimeMap:'06:30:00'},
{Id:28,TimeMap:'06:45:00'},
{Id:29,TimeMap:'07:00:00'},
{Id:30,TimeMap:'07:15:00'},
{Id:31,TimeMap:'07:30:00'},
{Id:32,TimeMap:'07:45:00'},
{Id:33,TimeMap:'08:00:00'},
{Id:34,TimeMap:'08:15:00'},
{Id:35,TimeMap:'08:30:00'},
{Id:36,TimeMap:'08:45:00'},
{Id:37,TimeMap:'09:00:00'},
{Id:38,TimeMap:'09:15:00'},
{Id:39,TimeMap:'09:30:00'},
{Id:40,TimeMap:'09:45:00'},
{Id:41,TimeMap:'10:00:00'},
{Id:42,TimeMap:'10:15:00'},
{Id:43,TimeMap:'10:30:00'},
{Id:44,TimeMap:'10:45:00'},
{Id:45,TimeMap:'11:00:00'},
{Id:46,TimeMap:'11:15:00'},
{Id:47,TimeMap:'11:30:00'},
{Id:48,TimeMap:'11:45:00'},
{Id:49,TimeMap:'12:00:00'},
{Id:50,TimeMap:'12:15:00'},
{Id:51,TimeMap:'12:30:00'},
{Id:52,TimeMap:'12:45:00'},
{Id:53,TimeMap:'13:00:00'},
{Id:54,TimeMap:'13:15:00'},
{Id:55,TimeMap:'13:30:00'},
{Id:56,TimeMap:'13:45:00'},
{Id:57,TimeMap:'14:00:00'},
{Id:58,TimeMap:'14:15:00'},
{Id:59,TimeMap:'14:30:00'},
{Id:60,TimeMap:'14:45:00'},
{Id:61,TimeMap:'15:00:00'},
{Id:62,TimeMap:'15:15:00'},
{Id:63,TimeMap:'15:30:00'},
{Id:64,TimeMap:'15:45:00'},
{Id:65,TimeMap:'16:00:00'},
{Id:66,TimeMap:'16:15:00'},
{Id:67,TimeMap:'16:30:00'},
{Id:68,TimeMap:'16:45:00'},
{Id:69,TimeMap:'17:00:00'},
{Id:70,TimeMap:'17:15:00'},
{Id:71,TimeMap:'17:30:00'},
{Id:72,TimeMap:'17:45:00'},
{Id:73,TimeMap:'18:00:00'},
{Id:74,TimeMap:'18:15:00'},
{Id:75,TimeMap:'18:30:00'},
{Id:76,TimeMap:'18:45:00'},
{Id:77,TimeMap:'19:00:00'},
{Id:78,TimeMap:'19:15:00'},
{Id:79,TimeMap:'19:30:00'},
{Id:80,TimeMap:'19:45:00'},
{Id:81,TimeMap:'20:00:00'},
{Id:82,TimeMap:'20:15:00'},
{Id:83,TimeMap:'20:30:00'},
{Id:84,TimeMap:'20:45:00'},
{Id:85,TimeMap:'21:00:00'},
{Id:86,TimeMap:'21:15:00'},
{Id:87,TimeMap:'21:30:00'},
{Id:88,TimeMap:'21:45:00'},
{Id:89,TimeMap:'22:00:00'},
{Id:90,TimeMap:'22:15:00'},
{Id:91,TimeMap:'22:30:00'},
{Id:92,TimeMap:'22:45:00'},
{Id:93,TimeMap:'23:00:00'},
{Id:94,TimeMap:'23:15:00'},
{Id:95,TimeMap:'23:30:00'},
{Id:96,TimeMap:'23:45:00'},
{Id:97,TimeMap:'00:00:00'},
{Id:98,TimeMap:'00:15:00'},
{Id:99,TimeMap:'00:30:00'},
{Id:100,TimeMap:'00:45:00'},
{Id:101,TimeMap:'01:00:00'},
{Id:102,TimeMap:'01:15:00'},
{Id:103,TimeMap:'01:30:00'},
{Id:104,TimeMap:'01:45:00'},
{Id:105,TimeMap:'02:00:00'},
{Id:106,TimeMap:'02:15:00'},
{Id:107,TimeMap:'02:30:00'},
{Id:108,TimeMap:'02:45:00'},
{Id:109,TimeMap:'03:00:00'},
{Id:110,TimeMap:'03:15:00'},
{Id:111,TimeMap:'03:30:00'},
{Id:112,TimeMap:'03:45:00'},
{Id:113,TimeMap:'04:00:00'},
{Id:114,TimeMap:'04:15:00'},
{Id:115,TimeMap:'04:30:00'},
{Id:116,TimeMap:'04:45:00'},
{Id:117,TimeMap:'05:00:00'},
{Id:118,TimeMap:'05:15:00'},
{Id:119,TimeMap:'05:30:00'},
{Id:120,TimeMap:'05:45:00'},
{Id:121,TimeMap:'06:00:00'},
{Id:122,TimeMap:'06:15:00'},
{Id:123,TimeMap:'06:30:00'},
{Id:124,TimeMap:'06:45:00'},
{Id:125,TimeMap:'07:00:00'},
{Id:126,TimeMap:'07:15:00'},
{Id:127,TimeMap:'07:30:00'},
{Id:128,TimeMap:'07:45:00'},
{Id:129,TimeMap:'08:00:00'},
{Id:130,TimeMap:'08:15:00'},
{Id:131,TimeMap:'08:30:00'},
{Id:132,TimeMap:'08:45:00'},
{Id:133,TimeMap:'09:00:00'},
{Id:134,TimeMap:'09:15:00'},
{Id:135,TimeMap:'09:30:00'},
{Id:136,TimeMap:'09:45:00'},
{Id:137,TimeMap:'10:00:00'},
{Id:138,TimeMap:'10:15:00'},
{Id:139,TimeMap:'10:30:00'},
{Id:140,TimeMap:'10:45:00'},
{Id:141,TimeMap:'11:00:00'},
{Id:142,TimeMap:'11:15:00'},
{Id:143,TimeMap:'11:30:00'},
{Id:144,TimeMap:'11:45:00'},
{Id:145,TimeMap:'12:00:00'},
{Id:146,TimeMap:'12:15:00'},
{Id:147,TimeMap:'12:30:00'},
{Id:148,TimeMap:'12:45:00'},
{Id:149,TimeMap:'13:00:00'},
{Id:150,TimeMap:'13:15:00'},
{Id:151,TimeMap:'13:30:00'},
{Id:152,TimeMap:'13:45:00'},
{Id:153,TimeMap:'14:00:00'},
{Id:154,TimeMap:'14:15:00'},
{Id:155,TimeMap:'14:30:00'},
{Id:156,TimeMap:'14:45:00'},
{Id:157,TimeMap:'15:00:00'},
{Id:158,TimeMap:'15:15:00'},
{Id:159,TimeMap:'15:30:00'},
{Id:160,TimeMap:'15:45:00'},
{Id:161,TimeMap:'16:00:00'},
{Id:162,TimeMap:'16:15:00'},
{Id:163,TimeMap:'16:30:00'},
{Id:164,TimeMap:'16:45:00'},
{Id:165,TimeMap:'17:00:00'},
{Id:166,TimeMap:'17:15:00'},
{Id:167,TimeMap:'17:30:00'},
{Id:168,TimeMap:'17:45:00'},
{Id:169,TimeMap:'18:00:00'},
{Id:170,TimeMap:'18:15:00'},
{Id:171,TimeMap:'18:30:00'},
{Id:172,TimeMap:'18:45:00'},
{Id:173,TimeMap:'19:00:00'},
{Id:174,TimeMap:'19:15:00'},
{Id:175,TimeMap:'19:30:00'},
{Id:176,TimeMap:'19:45:00'},
{Id:177,TimeMap:'20:00:00'},
{Id:178,TimeMap:'20:15:00'},
{Id:179,TimeMap:'20:30:00'},
{Id:180,TimeMap:'20:45:00'},
{Id:181,TimeMap:'21:00:00'},
{Id:182,TimeMap:'21:15:00'},
{Id:183,TimeMap:'21:30:00'},
{Id:184,TimeMap:'21:45:00'},
{Id:185,TimeMap:'22:00:00'},
{Id:186,TimeMap:'22:15:00'},
{Id:187,TimeMap:'22:30:00'},
{Id:188,TimeMap:'22:45:00'},
{Id:189,TimeMap:'23:00:00'},
{Id:190,TimeMap:'23:15:00'},
{Id:191,TimeMap:'23:30:00'},
{Id:192,TimeMap:'23:45:00'},

]
