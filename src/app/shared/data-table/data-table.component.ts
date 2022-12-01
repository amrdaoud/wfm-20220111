import { ColumnDef, DynamicTableByndingModel } from './../../app-models/shared/table-config';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, merge, Observable, startWith, switchMap, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
@Input() data = new Observable<any[]>();
@Input() columnsDef: ColumnDef[] = [];
@Input() clickable: boolean = false;
@Input() activeSort!: string;
@Input() borders = false;
@Input() havePaging: boolean = false;
@Input() padding!: string
@Input() haveFilter: boolean = false;
@Input() isObservableFilter: boolean = false;
@Input() isLoading = new Observable<boolean>();
@Input() dataSize = new Observable<number>();
@Output() rowClicked = new EventEmitter<any>();
@Output() bindingChanged = new EventEmitter<Observable<DynamicTableByndingModel>>();
@ViewChild(MatSort) sort!: MatSort;
@ViewChild(MatPaginator) paginator!: MatPaginator;
dataSource = new MatTableDataSource<any>();
columns: string[] = [];
filterControl = new FormControl('');
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(changes['data'])
    this.data.subscribe(result => {
      this.dataSource = new MatTableDataSource<any>(result);
    });
    if(changes['columnsDef']) {
      this.columns = this.columnsDef.map(x => x.Property + (x.SubProperty ? x.SubProperty : ''));
    }
  }
  ngOnInit(): void {
    this.columns = this.columnsDef.map(x => x.Property + (x.SubProperty ? x.SubProperty : ''));
  }
  ngAfterViewInit(): void {
    this.data.subscribe(result => {
      this.dataSource.data = result;
      console.log(this.dataSource.data)
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.sort.sortChange.subscribe(() => (this.paginator ? this.paginator.pageIndex = 0 : ''));
    if(!this.isObservableFilter) {
      this.filterControl.valueChanges.subscribe((val: string) => {
        (this.paginator ? this.paginator.pageIndex = 0 : '');
        this.dataSource.filter = val;
      });
    }
    else {
      this.filterControl.valueChanges.subscribe((val: string) => {
        (this.paginator ? this.paginator.pageIndex = 0 : '');
      });
    }


    const mergedBinding = this.paginator ? merge(this.sort.sortChange,
      this.paginator.page,
      this.filterControl.valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged()
      )
      ) : merge(this.sort.sortChange,
        this.filterControl.valueChanges.pipe(
          debounceTime(400),
          distinctUntilChanged()
        )
        );
    this.bindingChanged.emit(mergedBinding.pipe(
      startWith({}),
      map(() => {
        const ret = new DynamicTableByndingModel();
        ret.SearchQuery = this.filterControl.value;
        ret.Sort = this.sort.active;
        ret.Order = this.sort.direction;
        ret.PageIndex = this.paginator? this.paginator.pageIndex : 0;
        ret.PageSize = this.paginator? this.paginator.pageSize : 0;
        return ret;
      })
    ));
  }
  rowClick(model: any) {
    this.rowClicked.emit(model);
  }

}
