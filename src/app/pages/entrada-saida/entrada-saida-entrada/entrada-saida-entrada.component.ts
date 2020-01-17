import { Component, OnInit } from '@angular/core';
import { EntradaESaida } from '../../../@core/model/entradaESaida';
import { DbService } from '../../../@core/services/db.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { EntradaSaidaComponent } from '../entrada-saida.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-entrada-saida-entrada',
  templateUrl: './entrada-saida-entrada.component.html',
  styleUrls: ['./entrada-saida-entrada.component.scss']
})
export class EntradaSaidaEntradaComponent implements OnInit {

  novaEntrada: EntradaESaida;
  entradas: EntradaESaida[];
  data: any;
  public entrada: string;
  
  constructor(private dbService: DbService, private toastrService: NbToastrService, private ref: NbDialogRef<EntradaSaidaComponent>) {

  }

  ngOnInit() {
    console.log("dataaaaaa", this.data);
    this.novaEntrada = new EntradaESaida();
    if (this.data) {
      this.novaEntrada = this.data
      this.novaEntrada.emailUsuario = this.data.usuarioEmail
    }
    this.novaEntrada.entrada = new Date().toString();
    this.entrada = new Date(this.novaEntrada.entrada).toLocaleString();
    console.log(this.novaEntrada.entrada);

  }

  insert() {
    this.novaEntrada.entrada = this.entrada;
    if (!this.novaEntrada.placa) {
      this.showToast("Erro ao cadastrar entrada", "danger");
    } else {
      this.dbService.insertInList<EntradaESaida>('/entradaesaida', this.novaEntrada)
        .then(() => {
          this.novaEntrada;
          this.showToast("Entrada cadastrado com sucesso", "success");
          this.ref.close();
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
    this.ref.close();
  }

}
