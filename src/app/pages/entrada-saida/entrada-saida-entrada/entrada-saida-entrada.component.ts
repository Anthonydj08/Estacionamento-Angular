import { Component, OnInit } from '@angular/core';
import { EntradaESaida } from '../../../@core/model/entradaESaida';
import { DbService } from '../../../@core/services/db.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';
import { EntradaSaidaComponent } from '../entrada-saida.component';

@Component({
  selector: 'ngx-entrada-saida-entrada',
  templateUrl: './entrada-saida-entrada.component.html',
  styleUrls: ['./entrada-saida-entrada.component.scss']
})
export class EntradaSaidaEntradaComponent implements OnInit {

  novaEntrada: EntradaESaida;
  entradas: EntradaESaida[];
  

  constructor(private dbService: DbService, private toastrService: NbToastrService, protected ref: NbDialogRef<EntradaSaidaComponent>) { 
    
  }

  ngOnInit() {
    this.novaEntrada = new EntradaESaida();
    this.novaEntrada.entrada = new Date().toLocaleString();
    console.log(this.novaEntrada.entrada);
    
  }

  insert() {
    
    if(!this.novaEntrada.placa){
      this.showToast("Erro ao cadastrar entrada", "danger");
    } else{
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
