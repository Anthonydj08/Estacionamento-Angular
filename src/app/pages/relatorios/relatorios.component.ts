import { Router } from '@angular/router';
import { EntradaESaida } from './../../@core/model/entradaESaida';
import { DbService } from './../../@core/services/db.service';
import { Component, OnInit } from '@angular/core';

import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {

  entradasESaidas: LocalDataSource;
  dados: any;

  constructor(private dbService: DbService, public router: Router) {
  }

  ngOnInit() {
    this.loadEntradasEsaidas();
  }

  private async loadEntradasEsaidas() {
    await this.dbService.listWithUIDs<EntradaESaida>('/entradaesaida')
      .then(entradaESaidas => {
        this.entradasESaidas = new LocalDataSource(entradaESaidas);
      }).catch(error => {
        console.log(error);
      });
  }

  settings = {
    mode: "external",
    actions: {
      columnTitle: "",
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      placa: {
        title: 'Placa',
        type: 'string',
        filter: true
      },
      modelo: {
        title: 'Modelo',
        type: 'string',
        filter: true
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
        filter: true
      },
      emailUsuario: {
        title: 'E-mail',
        type: 'string',
        filter: true
      },
      entrada: {
        title: 'Entrada',
        type: 'date',
        filter: true
      },
      saida: {
        title: 'Saída',
        type: 'string',
        filter: true
      },
    },
  };
  headRows() {
    return [
      {modelo:'Modelo', placa: 'Placa', tipo: 'Tipo', emailUsuario: 'E-mail', entrada: 'Entrada', saida: "Saída" },
    ]
  }

  downloadPDF() {
    this.entradasESaidas.getFilteredAndSorted().then(data=>{
      const doc = new jsPDF()
      doc.autoTable({
        head: this.headRows(),
        body: data,
      })
      doc.save('tabela.pdf')
    })
  }
}