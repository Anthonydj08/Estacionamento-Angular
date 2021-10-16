import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Veiculo } from '../../../@core/model/veiculo';
import { CommonService } from '../../../@core/services/common.service';
import { EntradaSaidaEntradaComponent } from '../../entrada-saida/entrada-saida-entrada/entrada-saida-entrada.component';
import { UsuarioInsertComponent } from '../../usuario/usuario-insert/usuario-insert.component';
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

  private async cadastrarVeiculoUsuario() {
    await this.dialogService.open(VeiculoInsertComponent,{
      context: {
        data: this.data,
      },
    }).onClose.toPromise().then(()=>{
      this.irParaCadastroUsuario();
    });
  }

  private async irParaCadastro() {
    this.irParaCadastro().then(()=>{
    });
    this.ref.close();
  }

  private async irParaCadastroUsuario() {
    await this.dialogService.open(UsuarioInsertComponent,{
    }).onClose.toPromise().then(()=>{
      this.irParaRegistrarEntrada();
    });
  }

  private async irParaRegistrarEntrada() {
    await this.dialogService.open(EntradaSaidaEntradaComponent,{
      context: {
        data2: this.data,
      },
    });
    this.ref.close();
  }
}
