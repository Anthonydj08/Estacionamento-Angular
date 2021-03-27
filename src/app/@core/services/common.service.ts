import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
    invokeEvent: Subject<any> = new Subject(); 

    callCommonMethod() {
      if(this.invokeEvent.observers.length>1){
        this.invokeEvent.observers.shift();
      }
      this.invokeEvent.next(true);
    }
}
