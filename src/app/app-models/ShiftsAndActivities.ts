import { DatePipe } from "@angular/common";
import { DecimalPipe } from "@angular/common";
import { ColumnDef } from "./shared/table-config";

export interface Shift {
  Id: number;
  Name: string;
  EarlyStart: string;
  LateEnd: string;
  ShiftDuration: number;
}
export const shiftColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Early Start', Property: 'EarlyStart', Pipe: null, IsSort: true},
  {Name: 'Late End', Property: 'LateEnd', Pipe: null, IsSort: true},
  {Name: 'Duration(H)', Property: 'ShiftDuration', Pipe: null, IsSort: true}
];

export interface Activity {
  Id: number;
  Name: string;
  Color: string;
  IsPhone: boolean,
  IsAbsence: boolean,
  IsPaid: boolean,
  IsWorkTime: boolean,
  CreatedBy: string,
  CreateDate: Date,
  UpdatedBy: string,
  UpdateDate: Date,
  DisableEdit: boolean
}

export const activityColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Color', Property: 'Color', Pipe: null, IsSort: false, Icon: 'square', ColorProperty:'Color', HideData: true},
  {Name: 'Phone?', Property: 'IsPhone', Pipe: null, IsSort: true},
  {Name: 'Paid?', Property: 'IsPaid', Pipe: null, IsSort: true},
  {Name: 'Working Time?', Property: 'IsWorkTime', Pipe: null, IsSort: true},
  {Name: 'Acsence?', Property: 'IsAbsence', Pipe: null, IsSort: true},
  {Name: 'Creator', Property: 'CreatedBy', Pipe: null, IsSort: true},
  // {Name: 'Create Date', Property: 'CreateDate', Pipe: DatePipe, IsSort: true},
  // {Name: 'Updated by', Property: 'UpdatedBy', Pipe: null, IsSort: true},
  // {Name: 'Update Date', Property: 'UpdateDate', Pipe: DatePipe, IsSort: true},
];
