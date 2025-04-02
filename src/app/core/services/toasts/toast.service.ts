import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastr: ToastrService
  ) { }

  showToast(type: 'success' | 'error' | 'info' | 'warning', title:string , message: string) {
    switch(type){
      case 'success':
        this.toastr.success(title, message);
        break;
      case'error':
        this.toastr.error(title, message);
        break;
      case'info':
        this.toastr.info(title, message);
        break;
      case'warning':
        this.toastr.warning(title, message);
        break;
        default:
          this.toastr.info(title, message);
          break;
    }
  }


}
