import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Veiculo } from '../../../@core/model/veiculo';
import { CommonService } from '../../../@core/services/common.service';
import { DbService } from '../../../@core/services/db.service';

@Component({
  selector: 'ngx-veiculo-insert',
  templateUrl: './veiculo-insert.component.html',
  styleUrls: ['./veiculo-insert.component.scss']
})
export class VeiculoInsertComponent implements OnInit {


  novoVeiculo: Veiculo;
  veiculo: Veiculo[];
  loading: boolean;
  data: any;

  constructor(private dbService: DbService,
    private toastrService: NbToastrService,
    protected ref: NbDialogRef<VeiculoInsertComponent>,
    private _commonService: CommonService) { }

  ngOnInit() {
    this.novoVeiculo = new Veiculo();
    console.log("asdasdasd", this.data);
    if (this.data) {
      this.novoVeiculo.placa = this.data.plate;
      this.novoVeiculo.modelo = this.data.vehicle.make_model[0].name[0].toUpperCase() + this.data.vehicle.make_model[0].name.substr(1).toLowerCase();
      this.novoVeiculo.fabricante = this.data.vehicle.make[0].name[0].toUpperCase() + this.data.vehicle.make[0].name.substr(1).toLowerCase();
      this.novoVeiculo.tipo = this.data.vehicle.body_type[0].name[0].toUpperCase() + this.data.vehicle.body_type[0].name.substr(1).toLowerCase();
    }
    document.getElementById("inputModelo").addEventListener("keyup", this.forceFirstInputUppercase, false);
    document.getElementById("inputCor").addEventListener("keyup", this.forceFirstInputUppercase, false);
    document.getElementById("inputFabricante").addEventListener("keyup", this.forceFirstInputUppercase, false);
    document.getElementById("inputTipo").addEventListener("keyup", this.forceFirstInputUppercase, false);
  }

  forceFirstInputUppercase(e) {
    let start = e.target.selectionStart;
    if (start == 1) {
      // uppercase first letter
      e.target.value = e.target.value.toUpperCase();
    }
  }

  insert() {
    if (!this.novoVeiculo.modelo && !this.novoVeiculo.cor && !this.novoVeiculo.fabricante && !this.novoVeiculo.placa && !this.novoVeiculo.tipo) {
      this.showToast("Erro ao cadastrar veículo", "danger");
    } else {
      this.dbService.insertInList<Veiculo>('/veiculo', this.novoVeiculo)
        .then(() => {
          this.novoVeiculo;
          this.showToast("Veiculo cadastrado com sucesso", "success");
          this._commonService.callCommonMethod();
          this.ref.close();
        }).catch(error => {
          console.log(error);
          this.showToast("Erro ao cadastrar veículo", "danger");
        });
    }
  }

  proibido() {
    if (!this.novoVeiculo.modelo && !this.novoVeiculo.cor && !this.novoVeiculo.fabricante && !this.novoVeiculo.placa && !this.novoVeiculo.tipo) {
      this.showToast("Erro ao adicionar veículo a lista", "danger");
    } else {
      this.dbService.insertInList<Veiculo>('/veiculosProibidos', this.novoVeiculo)
        .then(() => {
          this.novoVeiculo;
          this.showToast("Veiculo adicionado a lista", "success");
          this._commonService.callCommonMethod();
          this.ref.close();
        }).catch(error => {
          console.log(error);
          this.showToast("Erro ao adicionar veículo a lista", "danger");
        });
    }
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }
  public cancelar() {
    this._commonService.callCommonMethod();
    this.ref.close();
  }



}
