import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { Veiculo } from '../../../@core/model/veiculo';
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

  constructor(private dbService: DbService, private toastrService: NbToastrService, protected ref: NbDialogRef<VeiculoInsertComponent>) { }

  ngOnInit() {
    this.novoVeiculo = new Veiculo();
    console.log("asdasdasd", this.data);
    if(this.data){
      this.novoVeiculo.placa = this.data.plate;
      this.novoVeiculo.fabricante = this.data.vehicle.make[0].name;
      this.novoVeiculo.tipo = this.data.vehicle.body_type[0].name;
    }
  }

  insert() {
    if(!this.novoVeiculo.modelo){
      this.showToast("Erro ao cadastrar veículo", "danger");
    } else{
      this.dbService.insertInList<Veiculo>('/veiculo', this.novoVeiculo)
      .then(() => {
        this.novoVeiculo;
        this.showToast("Veiculo cadastrado com sucesso", "success");
        this.ref.close();
      }).catch(error => {
        console.log(error);
        this.showToast("Erro ao cadastrar veículo", "danger");
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
    this.ref.close();
  }



}
