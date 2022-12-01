import { startWith, tap } from 'rxjs';

import { filterGroupTypes, AdherenceFilter } from './../../app-models/analysis';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AnalysisService } from 'src/app/app-services/analysis/analysis.service';

@Component({
  selector: 'app-adherence-filter',
  templateUrl: './adherence-filter.component.html',
  styleUrls: ['./adherence-filter.component.css']
})
export class AdherenceFilterComponent implements OnInit {
filterForm = new FormGroup({
  DateFrom: new FormControl('',[Validators.required]),
  DateTo: new FormControl('', [Validators.required]),
  FilterType: new FormControl('Staff'),
  FilterValue: new FormControl([], [Validators.required]),
  IsDaily: new FormControl(false),
  GroupBy: new FormControl('Staff')
})
filterValues = this.analysisService.filterValues;
filterTypes = filterGroupTypes;
@Output() filterSelected = new EventEmitter<AdherenceFilter>();
  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
    this.filterForm.get('FilterType')?.valueChanges.pipe(
      startWith('Staff'),
      tap(() => this.filterForm.get('FilterValue')?.setValue(''))
    )
    .subscribe(x => this.analysisService.setFilterValueByType(x,''));
    this.filterForm.get('FilterValue')?.valueChanges.pipe(
    ).subscribe(y => {
      const fValue = this.filterForm.get('FilterType')?.value as string;
      this.analysisService.setFilterValueByType(fValue,y);
    })
  }
  onSubmit() {
    const obj = JSON.parse(JSON.stringify(this.filterForm.value));
    obj.FilterValue = [obj.FilterValue];
    this.filterSelected.emit(obj as AdherenceFilter);
  }

}
