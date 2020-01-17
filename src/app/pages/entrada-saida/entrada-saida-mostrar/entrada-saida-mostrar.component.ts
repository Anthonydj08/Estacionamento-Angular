import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntradaESaida } from '../../../@core/model/entradaESaida';
import { DbService } from '../../../@core/services/db.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-entrada-saida-mostrar',
  templateUrl: './entrada-saida-mostrar.component.html',
  styleUrls: ['./entrada-saida-mostrar.component.scss']
})
export class EntradaSaidaMostrarComponent implements OnInit {

  public data: any;
  entradaESaida: EntradaESaida;
  public saida: string;
  constructor(public route: ActivatedRoute, public router: Router, private dbService: DbService, private toastrService: NbToastrService, ) {
  }

  ngOnInit() {
    this.entradaESaida = new EntradaESaida();
    this.route.queryParams.subscribe((res) => {
      this.data = JSON.parse(res.value);
    });
    this.entradaESaida = this.data
    this.entradaESaida.saida = new Date().toString();
    this.saida = new Date(this.entradaESaida.saida).toLocaleString();
    console.log(this.data);

  }
  registraSaida() {
    const updatingObject = { saida: this.saida };
    this.dbService.update('/entradaesaida', this.entradaESaida.uid, updatingObject)
      .then(() => {
        this.showToast("Saída registrada!", "success");
      }).catch(error => {
        console.log(error);
        this.showToast("Erro ao registrar Saída", "danger")
      });
  }
  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }
}
