import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class DataBroadcastService {

  /* private messageSource = new BehaviorSubject('default message');
   currentMessage = this.messageSource.asObservable();
 
   constructor() { }
 
    changeMessage(message: string) {
     this.messageSource.next(message)
   } */

  private selectSub = new Subject<any>();

  cartData = new EventEmitter<any>();

  sessionData = new EventEmitter<any>();

  hideCartItem = new EventEmitter<any>();

  // hide the signin and signup
  hideSignInData = new EventEmitter<any>();

  // hide the signin and signup
  hideButtons = new EventEmitter<any>();


/* 
  public setSub(dataFlag: any) {
    this.selectSub.next(dataFlag);
  }
  public clearSub() {
    this.selectSub.next();
  }
  public getSub() {
    return this.selectSub.asObservable();
  } */

}
