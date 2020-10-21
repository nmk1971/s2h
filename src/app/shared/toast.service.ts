import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private state$ = new Subject<{ severity: string, summary: string, detail: string, life?: number }>();

  constructor() { }

  public notifyToast(severity, summary, detail, life= 0): void {
    this.state$.next({ severity, summary, detail, life });

  }

  public getToast(): Observable<{ severity, summary, detail, life }> {
    return this.state$ as Observable<{ severity, summary, detail, life }>
  }

}
