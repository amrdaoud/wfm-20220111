import { Transportation, StaffMember, HeadOfSection } from './../../../app-models/resources';
import { debounceTime, distinctUntilChanged, filter, merge, Observable, of, startWith, switchMap, map, tap, BehaviorSubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { HeadOfSectionService } from './../../../app-services/resources/head-of-section.service';
import { StaffMemberService } from './../../../app-services/resources/staff-member.service';
import { TransportationService } from './../../../app-services/resources/transportation.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-autocomplete',
  templateUrl: './search-autocomplete.component.html',
  styleUrls: ['./search-autocomplete.component.css']
})
export class SearchAutocompleteComponent implements OnInit {
  searchControl = new FormControl('');
  filteredOptions: Observable<any[]> = of([]);
  privatetypeControl = new FormControl('Staff');
  typeControl = new FormControl('Staff');
  staffBindingModel = this.staffService.bindingModel;
  @Output() selected = new EventEmitter<{searchQuery: string, type: string}>()
  constructor(private transportationService: TransportationService,
              private staffService: StaffMemberService,
              private hosService: HeadOfSectionService) { }

  ngOnInit(): void {
    this.filteredOptions = merge(
      this.typeControl.valueChanges,
      this.searchControl.valueChanges.pipe(

        debounceTime(600),
        distinctUntilChanged(),
        tap(val => this.selected.emit({searchQuery: val, type: this.typeControl?.value}))
      )
    ).pipe(
      switchMap(() => {
        if(this.typeControl.value === 'Staff') {
          this.staffBindingModel.SearchQuery = this.searchControl.value;
          return this.staffService.getAll()
        }
        else
        if(this.typeControl.value === 'Transportation')
        {
          return this.transportationService.transportations().pipe(
            map(x => x.filter(y => y.Name.toLowerCase().startsWith(this.searchControl.value.toString().toLowerCase())
            || y.Id.toString() === this.searchControl.value.toString()))
          )
        }
        else {
          return this.hosService.headOfSections().pipe(
            map(x => x.filter(y => y.Name.toLowerCase().startsWith(this.searchControl.value.toString().toLowerCase())
            || y.Alias.toLowerCase().startsWith(this.searchControl.value.toString().toLowerCase())
            || y.EmployeeId.toString() === this.searchControl.value.toString())
            )
            )
        }
      })
    )
  }
  changeQuery(event: any) {
    this.selected.emit({searchQuery: event.option.value, type: this.typeControl?.value});
  }

  changeQueryValue(event: any) {
    console.log(event);
  }
}
