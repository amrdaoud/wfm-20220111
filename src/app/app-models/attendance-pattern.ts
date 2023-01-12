export interface DailyAttendancePattern {
    Id: number;
    ScheduleId: number;
    StaffMemberId: number;
    SublocationId: number;
    SublocationName: string;
    TransportationId: number;
    TransportationName: string;
    DayOffs: string[];
    ScheduleName: string;
    StaffMemberName: string;
    StaffMemberEmployeeId: number;
    inEdit: boolean;
}
