export interface AdherenceByStaff {
  ScheduleId:number;
  StaffId: number;
  Adherence: number;
}
export interface AdherenceByStaffDay {
  StaffId: number;
  Day: Date;
  Adherence: number;
}
export interface AdherenceBySchedule {
  ScheduleId: number;
  Adherence: number;
}
export interface AdherenceByDay {
  Day: Date;
  Adherence: number;
}

export interface AdherenceByStaffLoader {
  ScheduleId:number;
  StaffId: number;
}
export interface AdherenceByStaffDayLoader {
  StaffId: number;
  Day: Date;
}
export interface AdherenceByScheduleLoader {
  ScheduleId: number;
}
export interface AdherenceByDayLoader {
  Day: Date;
}
