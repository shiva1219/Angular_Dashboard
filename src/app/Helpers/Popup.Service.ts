import { Injectable } from '@angular/core';
import {ToasterService,Toast} from 'angular2-toaster';

@Injectable()
export class PopupService {

  constructor(private _toasterService:ToasterService) { 
  }

  showSuccess(message:string){
    var toast : Toast = {
        type: 'success',
        body: message,
        showCloseButton: true,
        timeout:2000
    };
    this._toasterService.pop(toast);
  }
  showError(message:string){
    var toast : Toast = {
        type: 'error',
        body: message,
        showCloseButton: true
    };
    this._toasterService.pop(toast);
  }
  showWarning(message:string){
    var toast : Toast = {
        type: 'warning',
        body: message,
        showCloseButton: true
    };
    this._toasterService.pop(toast);
  }
}