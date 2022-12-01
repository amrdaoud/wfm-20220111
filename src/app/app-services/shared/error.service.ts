import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorComponent } from 'src/app/shared/error/error.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private dialog: MatDialog) { }
  open(Code: number, Message: string) {
    this.dialog.open(ErrorComponent, {data:{Code,Message}, panelClass:'error-dialog', disableClose: true});
  }
}
