import { Location, LocationColumns } from './../../app-models/resources';
import { ColumnDef } from './../../app-models/shared/table-config';
import { LocationService } from './../../app-services/resources/location.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LocationAddComponent } from '../location-add/location-add.component';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css']
})
export class LocationListComponent implements OnInit {
observableData = new Observable<Location[]>();
isLoading = new Observable<boolean>();
columnsDef: ColumnDef[] = [];
  constructor(private locationService: LocationService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.columnsDef = LocationColumns;
    this.observableData = this.locationService.locations();
    this.isLoading = this.locationService.status();
  }
  openLocation(model?: Location) {
    this.dialog.open(LocationAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.locationService.edit(model.Id, result);
        }
        else {
          this.locationService.add(result);
        }
      }
    })
  }

}
