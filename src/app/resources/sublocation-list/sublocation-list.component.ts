import { SublocationAddComponent } from './../sublocation-add/sublocation-add.component';
import { SublocationService } from './../../app-services/resources/sublocation.service';
import { SubLocation, SublocationColumns } from './../../app-models/resources';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ColumnDef } from 'src/app/app-models/shared/table-config';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sublocation-list',
  templateUrl: './sublocation-list.component.html',
  styleUrls: ['./sublocation-list.component.css']
})
export class SublocationListComponent implements OnInit {
  observableData = new Observable<SubLocation[]>();
  isLoading = new Observable<boolean>();
  columnsDef: ColumnDef[] = [];
    constructor(private subLocationService: SublocationService,
                private dialog: MatDialog) { }

    ngOnInit(): void {
      this.columnsDef = SublocationColumns;
      this.observableData = this.subLocationService.subLocations();
      this.isLoading = this.subLocationService.status();
    }
    openLocation(model?: SubLocation) {
      this.dialog.open(SublocationAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
      .afterClosed().subscribe(result => {
        if(result) {
          if(model) {
            this.subLocationService.edit(model.Id, result);
          }
          else {
            this.subLocationService.add(result);
          }
        }
      })
    }

  }
