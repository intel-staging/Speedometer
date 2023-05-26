import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { delay } from 'rxjs/operators';
import { MESSAGES } from '../mock-messages';
/*
This is a mock service producing messages from the MESSAGES array in mock-messages.ts
*/ 

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public numMsgsPerPage = 0;
  public pagenum: number = 0;
  public fetchDelay: number = 0;

  constructor() { }

  getAS(): Observable<any> {
    let pageOfMsgs = MESSAGES.slice(this.pagenum * this.numMsgsPerPage ,((this.pagenum + 1) * this.numMsgsPerPage));

    return of(pageOfMsgs)
      .pipe(delay(this.fetchDelay));
  }
}