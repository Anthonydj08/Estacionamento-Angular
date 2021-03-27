import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Veiculo } from '../../../@core/model/veiculo';
import { CommonService } from '../../../@core/services/common.service';
import { VeiculoInsertComponent } from '../../veiculo/veiculo-insert/veiculo-insert.component';
@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './showcase-dialog.component.html',
  styleUrls: ['./showcase-dialog.component.scss']
})
export class ShowcaseDialogComponent implements OnInit {

  @Input() data: any;
  public veiculo: Veiculo;
  public veiculos: Veiculo[];

  constructor(
    protected ref: NbDialogRef<ShowcaseDialogComponent>,
    private dialogService: NbDialogService,
    private _commonService: CommonService,
    ) { }

  async ngOnInit() {
    
  }

  dismiss() {
    this._commonService.callCommonMethod();
    this.ref.close();
  }

  cadastrar() {
    this.irParaCadastro();
    this.ref.close();
    console.log("ir para tela de cadastrar veiculo passando placa");
  }

  private async irParaCadastro() {
    this.dialogService.open(VeiculoInsertComponent,{
      context: {
        data: this.data,
      },
    })
  }
  
}
