import { DecimalPipe } from "@angular/common";
import { ColumnDef } from "./shared/table-config";

export interface AttendanceType {
  Id: number;
  Name: string;
  IsAbsence: boolean;
  DisableEdit: boolean;
  DefaultActivityId: number;
}

export const attendanceTypeColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Absence?', Property: 'IsAbsence', Pipe: null, IsSort: true}
];
