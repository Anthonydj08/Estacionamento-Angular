import { Component } from '@angular/core';
import { CommonService } from '../../@core/services/common.service';

@Component({
  selector: 'ngx-inicio',
  templateUrl: './inicio.component.html',
})
export class InicioComponent {

  public showComponent: boolean = true;

  constructor(private _commonService: CommonService) {
    this._commonService.invokeEvent.subscribe(event => {
      if (event) {
        this.teste();
        console.log(event);
      }
    })
  }

  teste() {
    this.showComponent = false;
    setTimeout(() => {
      this.showComponent = true;
    }, 500);
  }
}
