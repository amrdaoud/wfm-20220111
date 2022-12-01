import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
private theme = new BehaviorSubject<string>('default');
selectedTheme = this.theme.asObservable();
  constructor() {
    var t = localStorage.getItem('theme');
    if(!t) {
      this.theme.next('default');
    }
    else {
      this.theme.next(t);
    }
   }
  setTheme(t: string) {
    this.theme.next(t);
    localStorage.setItem('theme', t);
  }
  getTheme(): string {
    var t = localStorage.getItem('theme');
    if(!t) {
      return 'default';
    }
    return t.toString();
  }
}
