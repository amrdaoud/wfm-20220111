import { DatePipe, DecimalPipe, PercentPipe } from '@angular/common';
import { ColumnDef } from './shared/table-config';
export interface SwapRequest {
  Id: number;
  ScheduleName: string;
  RequesterName: string;
  ResponderName: string;
  RequestDate: Date;
  CloseDate: Date;
  RequesterDay: Date;
  ResponderDay: Date;
  StatusId: string;
  StatusName: string;
  CanAction: boolean;
  CanReverse: boolean;
}

export const swapColumns: ColumnDef[]  = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: "Schedule", Property: "ScheduleName", Pipe: null, IsSort: true},
  {Name: 'Issue Date', Property: 'RequestDate', Pipe: DatePipe, IsSort: true, PipeArgs: 'EEE dd/MM/yyyy'},
  {Name: 'Requester', Property: 'RequesterName', Pipe: null, IsSort: true},
  {Name: 'Requester Day', Property: 'RequesterDay', Pipe: DatePipe, IsSort: true, PipeArgs: 'EEE dd/MM/yyyy'},
  {Name: 'Responder', Property: 'ResponderName', Pipe: null, IsSort: true},
  {Name: 'Responder Day', Property: 'ResponderDay', Pipe: DatePipe, IsSort: true, PipeArgs: 'EEE dd/MM/yyyy'},
  {Name: 'Status', Property: 'StatusName', Pipe: null, IsSort: true},
  {Name: 'Close Date', Property: 'CloseDate', Pipe: DatePipe, IsSort: true, PipeArgs: 'EEE dd/MM/yyyy'},
];


export interface SwapRequestBinding {
  Id: number;
  SourceDailyAttendanceId: number;
  DestinationDailyAttendanceId: number;
}
export interface SwapRequestApprovalBinding {
  RequestId: number;
  IsApproved: boolean;
  Reason: string;
  State: string
}
