import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { DbService } from '../../../@core/services/db.service';
import { Veiculo } from '../../../@core/model/veiculo';

@Component({
  selector: 'ngx-showcase-dialog',
  templateUrl: './showcase-dialog.component.html',
  styleUrls: ['./showcase-dialog.component.scss']
})
export class ShowcaseDialogComponent implements OnInit {

  @Input() data: any;
  public veiculo: Veiculo;
  public veiculos: Veiculo[];


  constructor(protected ref: NbDialogRef<ShowcaseDialogComponent>, private dbService: DbService,) { }

  async ngOnInit() {
    await this.verificarPlaca();
  }

  private async verificarPlaca() {
    await this.dbService.search<Veiculo>('/veiculo', 'placa', this.data.plate)
      .then(veiculos => {
        this.veiculos = veiculos;
        if(veiculos.length == 0){
          console.log("não achou ir para tela de cadastrar veiculo");
        } else{
          console.log("achou IR PARA TELA DE REGISTRAR ENTRADA VEICULO");
        }
      }).catch(error => {
        console.log(error);
      });
  }

  dismiss() {
    this.ref.close();
  }

  cadastrar() {
    console.log("ir para tela de cadastrar veiculo passando placa");

  }
}
