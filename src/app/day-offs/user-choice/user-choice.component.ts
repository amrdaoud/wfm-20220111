import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { UserChoice } from 'src/app/app-models/day-offs';
import { AppUser } from 'src/app/app-models/root-models/app-user';
import { weekDays } from 'src/app/app-models/shared/dictionaries';
import { DayOffService } from 'src/app/app-services/day-offs/day-off.service';
import { InitialService } from 'src/app/app-services/root-services/initial.service';

@Component({
  selector: 'app-user-choice',
  templateUrl: './user-choice.component.html',
  styleUrls: ['./user-choice.component.css']
})
export class UserChoiceComponent implements OnInit {
frm!:FormGroup;
userChoice!: UserChoice;
attendanceTypes = this.dayOffService.attendanceTypes();
isLoadingTypes = this.dayOffService.typeStatus();
isLoading= this.dayOffService.status();
weekDyas = weekDays;
  constructor(private dayOffService: DayOffService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.dayOffService.getUserChoicesByAlias().subscribe(choice => {
      this.frm = this.dayOffService.createDayOffForm(choice!);
      this.userChoice = choice!;
    })
  }
  onSubmit(): void {
    if(this.frm.invalid) {
      return;
    }
    this.dayOffService.addUserChoice(this.frm.value).subscribe(x => {
      if(x) {
        this.snackBar.open('Your choices have been submitted for approval','OK',{duration: 2000})
        this.userChoice = x;
      }
    })
  }

}
