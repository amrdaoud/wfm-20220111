import { DatePipe, DecimalPipe } from '@angular/common';
import {ColumnDef} from './shared/table-config';
export interface Location {
  Id: number;
  Name: string;
  Address: string;
  ContactPhone: string;
}
export const LocationColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Address', Property: 'Address', Pipe: null, IsSort: false},
  {Name: 'Contact Phone', Property: 'ContactPhone', Pipe: null, IsSort: false}
];


export interface StaffMember {
  Id: number;
  EmployeeId: number;
  Name: string;
  Alias: string;
  Gender: string;
  Email: string;
  Language: string;
  Address: string;
  Note: string;
  StartDate: Date;
  LeaveDate: Date;
  HireDate: Date;
  PhoneNumber: string;
  EstimatedLeaveDays: number;
  Religion: string;
  StaffTypeId: number;
  StaffTypeName: string;
  TransportationRouteId: number;
  TransportationRouteName: string;
  LocationId: number;
  LocationName: string;
  HeadOfSectionId: number;
  HeadOfSectionName: string;
}

export const StaffMemberColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Employee Id', Property: 'EmployeeId', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Alias', Property: 'Alias', Pipe: null, IsSort: true},
  {Name: 'Phone', Property: 'PhoneNumber', Pipe: null, IsSort: false},
  {Name: 'Gender', Property: 'Gender', Pipe: null, IsSort: true},
  {Name: 'Type', Property: 'StaffTypeName', Pipe: null, IsSort: true},
  {Name: 'Transportation', Property: 'TransportationRouteName', Pipe: null, IsSort: true},
  {Name: 'Location', Property: 'LocationName', Pipe: null, IsSort: true},
  {Name: 'HOS', Property: 'HeadOfSectionName', Pipe: null, IsSort: true}
];


export interface StaffType {
  Id: number;
  Name: string;
  Description: string;
}

export const staffTypeColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Description', Property: 'Description', Pipe: null, IsSort: false}
];

export interface Transportation {
  Id: number;
  Name: string;
  Description: string;
  LocationId: number;
  LocationName: string;
  ArriveTime: Date;
  DepartTime: Date;
  IsIgnored: boolean;
}

export const transportationColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Arrive Time', Property: 'ArriveTime', Pipe: 'TimePipe', IsSort: true, PipeArgs: 'HH:mm'},
  {Name: 'Depart Time', Property: 'DepartTime', Pipe: 'TimePipe', IsSort: true, PipeArgs: 'HH:mm'},
  {Name: 'Description', Property: 'Description', Pipe: null, IsSort: false},
  {Name: 'Location', Property: 'LocationName', Pipe: null, IsSort: true}
];

export interface HeadOfSection {
  Id: number,
  EmployeeId: number,
  Name: string,
  Alias: string,
  Gender: string,
  Email: string,
  Language: string,
  Address: string,
  Note: string
}

export const headOfSectionColumns: ColumnDef[] = [
  {Name: 'Id', Property: 'Id', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Employee Id', Property: 'EmployeeId', Pipe: DecimalPipe, IsSort: true},
  {Name: 'Name', Property: 'Name', Pipe: null, IsSort: true},
  {Name: 'Alias', Property: 'Alias', Pipe: null, IsSort: true},
  {Name: 'Gender', Property: 'Gender', Pipe: null, IsSort: true}
];


