import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from 'src/app/shared/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private dialog: MatDialog) { }
  open(Message: string): Observable<boolean> {
    return this.dialog.open(ConfirmComponent, {data:{Message}, panelClass:'error-dialog', disableClose: true}).afterClosed()
  }
}
