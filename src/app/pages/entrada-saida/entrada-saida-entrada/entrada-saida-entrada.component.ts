import { Component, OnInit } from '@angular/core';
import { EntradaESaida } from '../../../@core/model/entradaESaida';
import { DbService } from '../../../@core/services/db.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { EntradaSaidaComponent } from '../entrada-saida.component';
import { Router } from '@angular/router';
import { CameraCardComponent } from '../../inicio/camera-card/camera-card.component';
import { CommonService } from '../../../@core/services/common.service';

@Component({
  selector: 'ngx-entrada-saida-entrada',
  templateUrl: './entrada-saida-entrada.component.html',
  styleUrls: ['./entrada-saida-entrada.component.scss']
})
export class EntradaSaidaEntradaComponent implements OnInit {

  novaEntrada: EntradaESaida;
  entradas: EntradaESaida[];
  data: any;
  data2: any;
  public entrada: string;
  
  constructor(private dbService: DbService,
    private toastrService: NbToastrService,
    private ref: NbDialogRef<EntradaSaidaComponent>,
    private _commonService: CommonService,
    ) {

  }

  ngOnInit() {
    this.novaEntrada = new EntradaESaida();
    if (this.data) {
      this.novaEntrada = this.data;
      this.novaEntrada.emailUsuario = this.data.usuarioEmail;
      this.novaEntrada.placa = this.data2.plate;
      this.novaEntrada.tipo = this.data2.vehicle.body_type[0].name[0].toUpperCase() + this.data.vehicle.body_type[0].name.substr(1).toLowerCase();
    }
    this.novaEntrada.entrada = new Date().toString();
    this.entrada = new Date(this.novaEntrada.entrada).toLocaleString();

    document.getElementById("inputTipo").addEventListener("keyup", this.forceFirstInputUppercase, false);
  }

  
  forceFirstInputUppercase(e)
  {
    let start = e.target.selectionStart;
    if(start == 1) {
      // uppercase first letter
      e.target.value = e.target.value.toUpperCase();
    }
  }

  insert() {
    this.novaEntrada.entrada = this.entrada;
    if (!this.novaEntrada.placa && !this.novaEntrada.entrada && !this.novaEntrada.tipo && !this.novaEntrada.emailUsuario) {
      this.showToast("Erro ao cadastrar entrada", "danger");
    } else {
      this.dbService.insertInList<EntradaESaida>('/entradaesaida', this.novaEntrada)
        .then(() => {
          this.novaEntrada;
          this.showToast("Entrada cadastrado com sucesso", "success");
          this.ref.close();
          this._commonService.callCommonMethod();
        }).catch(error => {
          console.log(error);
          this.showToast("Erro ao cadastrar entrada", "danger");
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
