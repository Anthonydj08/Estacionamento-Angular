import { Component, OnInit, Input } from '@angular/core';
import { DbService } from '../../../@core/services/db.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { Veiculo } from '../../../@core/model/veiculo';

@Component({
  selector: 'ngx-veiculo-edit',
  templateUrl: './veiculo-edit.component.html',
  styleUrls: ['./veiculo-edit.component.scss']
})
export class VeiculoEditComponent implements OnInit {

  @Input() editVeiculo: Veiculo;

  constructor(private dbService: DbService, private toastrService: NbToastrService, protected ref: NbDialogRef<VeiculoEditComponent>) { }

  ngOnInit() {
    console.log(this.editVeiculo);
    
  }
  edit(){
    const updatingObject = { modelo: this.editVeiculo.modelo, cor: this.editVeiculo.cor, fabricante: this.editVeiculo.fabricante, placa: this.editVeiculo.placa, tipo: this.editVeiculo.tipo, usuarioEmail: this.editVeiculo.usuarioEmail  };
    this.dbService.update('/veiculo', this.editVeiculo.uid, updatingObject)
      .then(() => {
        this.showToast("Veículo editado com sucesso", "success");
        this.ref.close();
      }).catch(error => {
        console.log(error);
        this.showToast("Erro ao editar veículo", "danger")
      });
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }
  
  cancelar() {
    this.ref.close();
  }


}
