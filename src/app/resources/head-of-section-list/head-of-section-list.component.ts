import { HeadOfSectionAddComponent } from './../head-of-section-add/head-of-section-add.component';
import { HeadOfSectionService } from './../../app-services/resources/head-of-section.service';
import { HeadOfSection, headOfSectionColumns } from './../../app-models/resources';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-head-of-section-list',
  templateUrl: './head-of-section-list.component.html',
  styleUrls: ['./head-of-section-list.component.css']
})
export class HeadOfSectionListComponent implements OnInit {
  observableData = this.headService.headOfSections();
  isLoading = this.headService.status();
  columnsDef = headOfSectionColumns;
  constructor(private headService: HeadOfSectionService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openHeadOfSection(model?: HeadOfSection) {
    this.dialog.open(HeadOfSectionAddComponent, {panelClass: 'add-dialog', disableClose: true, data: model})
    .afterClosed().subscribe(result => {
      if(result) {
        if(model) {
          this.headService.edit(model.Id, result);
        }
        else {
          this.headService.add(result);
        }
      }
    })
  }

}
