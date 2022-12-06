import { TransportationGuardAddComponent } from './../transportation-guard-add/transportation-guard-add.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Transportation, transportationColumns } from 'src/app/app-models/resources';
import { ColumnDef } from 'src/app/app-models/shared/table-config';
import { TransportationService } from 'src/app/app-services/resources/transportation.service';
import { TransportationAddComponent } from '../transportation-add/transportation-add.component';

@Component({
  selector: 'app-transportation-list',
  templateUrl: './transportation-list.component.html',
  styleUrls: ['./transportation-list.component.css']
})
export class TransportationListComponent implements OnInit {
  observableData = new Observable<Transportation[]>();
  isLoading = new Observable<boolean>();
  columnsDef: ColumnDef[] = [];
  constructor(private transportationService: TransportationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.columnsDef = transportationColumns;
    this.observableData = this.transportationService.transportations();
    this.isLoading = this.transportationService.status();
  }
  openTransportation(model?: Transportation) {
    this.dialog.open(TransportationAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.transportationService.edit(model.Id, result);
        }
        else {
          this.transportationService.add(result);
        }
      }
    })
  }
  openTransportationGuard(model?: Transportation) {
    this.dialog.open(TransportationGuardAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.transportationService.editGuard(model.Id, result);
        }
        else {
          this.transportationService.addGuard(result);
        }
      }
    })
  }

}
