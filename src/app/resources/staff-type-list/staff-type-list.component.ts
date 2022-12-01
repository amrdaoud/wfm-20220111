import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { StaffType, staffTypeColumns } from 'src/app/app-models/resources';
import { ColumnDef } from 'src/app/app-models/shared/table-config';
import { StaffTypeService } from 'src/app/app-services/resources/staff-type.service';
import { StaffTypeAddComponent } from '../staff-type-add/staff-type-add.component';

@Component({
  selector: 'app-staff-type-list',
  templateUrl: './staff-type-list.component.html',
  styleUrls: ['./staff-type-list.component.css']
})
export class StaffTypeListComponent implements OnInit {
  observableData = new Observable<StaffType[]>();
  isLoading = new Observable<boolean>();
  columnsDef: ColumnDef[] = [];
  constructor(private staffTypeService:StaffTypeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.columnsDef = staffTypeColumns;
    this.observableData = this.staffTypeService.staffTypes();
    this.isLoading = this.staffTypeService.status();
  }
  openType(model?: StaffType) {
    this.dialog.open(StaffTypeAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.staffTypeService.edit(model.Id, result);
        }
        else {
          this.staffTypeService.add(result);
        }
      }
    })
  }

}
