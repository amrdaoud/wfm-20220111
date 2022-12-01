import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputComponent),
    }
  ]
})
export class InputComponent implements OnInit {
@Input() type = 'text';
@Input() formGroup!: AbstractControl;
@Input() controlName = '';
@Input() label = '';
@Input() isChecking: boolean | null = false;
@Input() isAsync = false;
formControl!: FormControl;
  constructor() {

   }

  ngOnInit(): void {
    this.formControl = this.formGroup.get(this.controlName) as FormControl;
  }
  getErrors(): string {
    if(!this.formControl) return '';
    const controlErrors = this.formControl.errors;
    if(!controlErrors) return '';
    let errorMessage = '';
    Object.keys(controlErrors).forEach(keyError => {
      if(keyError === 'isTaken') errorMessage += this.formControl.value + " is taken!";
      if(keyError === 'minlength') errorMessage +=  `Minimum length is ${controlErrors[keyError].requiredLength}!`;
      if(keyError === 'maxlength') errorMessage +=  `Maximum length is ${controlErrors[keyError].requiredLength}!`;
      if(keyError === 'required') errorMessage +=  `${this.label} is required!`;
      if(keyError === 'email') errorMessage +=  `Not matching Email address pattern!`;
      if(keyError === 'pattern') errorMessage +=  `Not matching Email address pattern!`;
    })
    return errorMessage;
  }

}
