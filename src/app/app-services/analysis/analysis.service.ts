import { TransportationService } from 'src/app/app-services/resources/transportation.service';
import { HeadOfSectionService } from './../resources/head-of-section.service';
import { StaffMemberService } from 'src/app/app-services/resources/staff-member.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { BehaviorSubject, delay, finalize, Observable, of, tap, filter, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdherenceByHos, AdherenceReportData, AdherenceFilter, LeaderBoard, LeaderBoardwithSize, NeededVsAvailable, AdherenceReportColumns, ActivitiesReportData } from '../../app-models/analysis';
import { ColumnDef, DynamicTableByndingModel } from 'src/app/app-models/shared/table-config';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
private isLoadingGetNeededVsAvailableSubject = new BehaviorSubject<boolean>(false);
private isLoadingetLeaderBoardSubject = new BehaviorSubject<boolean>(false);
private isLoadingetAdherenceByHosSubject = new BehaviorSubject<boolean>(false);
private isLoadingAdherenceReportSubject = new BehaviorSubject<boolean>(false);
private filterValuesSubject = new BehaviorSubject<{Id: number, Name:string}[]>([]);
  constructor(private http: HttpClient,
              private staffMemberService: StaffMemberService,
              private hosService: HeadOfSectionService,
              private transportationService:TransportationService) { }
  getNeededVsAvailable(scheduleId: number, day: Date): Observable<NeededVsAvailable[]> {
    this.isLoadingGetNeededVsAvailableSubject.next(true);
    let params = new HttpParams()
    .set('scheduleId',scheduleId)
    .set('day', day.toDateString());
    return this.http.get<NeededVsAvailable[]>(environment.apiUrl + `analysis/neededvsavailable`, {params}).pipe(
      finalize(() => this.isLoadingGetNeededVsAvailableSubject.next(false))
    )
  }

  getLeaderBoard(scheduleId: number, pageIndex: number, pageSize: number): Observable<LeaderBoardwithSize> {
    this.isLoadingetLeaderBoardSubject.next(true);
    return this.http.get<LeaderBoardwithSize>(environment.apiUrl + `analysis/leaderboard/${scheduleId}?pageIndex=${pageIndex}&pageSize=${pageSize}`).pipe(
      finalize(() => this.isLoadingetLeaderBoardSubject.next(false))
    )
  }
  getAdherenceByHos(scheduleId: number): Observable<AdherenceByHos[]> {
    this.isLoadingetAdherenceByHosSubject.next(true);
    return this.http.get<AdherenceByHos[]>(environment.apiUrl + `analysis/adherencebyhos/${scheduleId}`).pipe(
      finalize(() => this.isLoadingetAdherenceByHosSubject.next(false))
    )
  }
  setFilterValueByType(type: string, searchQuery: string) {
    if(type === 'Staff') {
      const filter: DynamicTableByndingModel = {Order: 'asc', PageIndex: 0, SearchQuery: searchQuery, Filters:[], PageSize:30,Sort:'Name'}
      this.staffMemberService.getByFilter(filter!).pipe(
        tap(x => this.filterValuesSubject.next(x.map(z => {
          return {Id: z.EmployeeId, Name: z.Name}
        })))
      ).subscribe();
    }
    else if(type === 'Hos') {
      this.hosService.headOfSections().pipe(
        map(x => {
          return x.filter(z => z.Name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                  z.EmployeeId.toString().toLowerCase() === (searchQuery.toLowerCase()))
        }),
        tap(x => this.filterValuesSubject.next(x.map(z => {
          return {Id: z.EmployeeId, Name: z.Name};
        })))
      ).subscribe();
    }
    else if(type === 'Transportation') {
      this.transportationService.transportations().pipe(
        map(x => {
          return x.filter(z => z.Name.toLowerCase().startsWith(searchQuery.toLowerCase()) ||
                  z.Id.toString().toLowerCase() === (searchQuery.toLowerCase()))
        }),
        tap(x => this.filterValuesSubject.next(x.map(z => {
          return {Id: z.Id, Name: z.Name}
        })))
      ).subscribe();
    }
  }
  getAdherenceReportColumns(filter: AdherenceFilter): ColumnDef[] {
    const columns = []
    if(filter.GroupBy === 'Staff') {
      columns.push(AdherenceReportColumns.find(x => x.Property === 'StaffName')!)
    }
    else if(filter.GroupBy === 'Hos') {
      columns.push(AdherenceReportColumns.find(x => x.Property === 'HosName')!)
    }
    else {
      columns.push(AdherenceReportColumns.find(x => x.Property === 'TransportationRoute')!)
    }
    if(filter.IsDaily) {
      columns.push(AdherenceReportColumns.find(x => x.Property === 'Day')!);
    }
    columns.push(AdherenceReportColumns.find(x => x.Property === 'Adherance')!);
    columns.push(AdherenceReportColumns.find(x => x.Property === 'PhonebyHour')!);
    columns.push(AdherenceReportColumns.find(x => x.Property === 'ActivitybyHour')!);
    return columns;
  }
  getAdheranceReport(filter: AdherenceFilter): Observable<AdherenceReportData[]> {
    this.isLoadingAdherenceReportSubject.next(true);
    return this.http.post<AdherenceReportData[]>(environment.apiUrl + 'reports/adherance',filter).pipe(
      finalize(() => this.isLoadingAdherenceReportSubject.next(false))
    )
  }
  getActivitiesReport(day: Date): Observable<ActivitiesReportData[]> {
    this.isLoadingAdherenceReportSubject.next(true);
    let params = new HttpParams()
    .set('RequestDate',day.toDateString())
    return this.http.get<ActivitiesReportData[]>(environment.apiUrl + 'reports/activities',{params}).pipe(
      finalize(() => this.isLoadingAdherenceReportSubject.next(false))
    )
  }
  get isLoadingGetNeededVsAvailable(): Observable<boolean> {
    return this.isLoadingGetNeededVsAvailableSubject.asObservable();
  }
  get isLoadinGetLeaderBoard(): Observable<boolean> {
    return this.isLoadingetLeaderBoardSubject.asObservable();
  }
  get isLoadinGetAdherenceByHos(): Observable<boolean> {
    return this.isLoadingetAdherenceByHosSubject.asObservable();
  }
  get filterValues(): Observable<{Id: number, Name: string}[]> {
    return this.filterValuesSubject.asObservable();
  }
  get isLoadingAdheranceReport(): Observable<boolean> {
    return this.isLoadingAdherenceReportSubject.asObservable();
  }


}
