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

  entradasESaidas: EntradaESaida[];
  dados: any;

  source: LocalDataSource;

  constructor(private dbService: DbService, public router: Router) {
    this.source = new LocalDataSource(this.entradasESaidas);
  }

  ngOnInit() {
    this.loadEntradasEsaidas();
  }

  private async loadEntradasEsaidas() {
    await this.dbService.listWithUIDs<EntradaESaida>('/entradaesaida')
      .then(entradaESaidas => {
        this.entradasESaidas = entradaESaidas;
      }).catch(error => {
        console.log(error);
      });
    this.gerarRelatorio()
  }

  gerarRelatorio() {
    this.dados = []
    for (var i = 0; i <= this.entradasESaidas.length; i++) {
      this.dados.push({
        id: i,
        placa: this.entradasESaidas[i].placa,
        tipo: this.entradasESaidas[i].tipo,
        email: this.entradasESaidas[i].emailUsuario,
        entrada: this.entradasESaidas[i].entrada,
        saida: this.entradasESaidas[i].saida,
      })
    }
  }

  settings = {
    mode: "external",
    actions: {
      columnTitle: "",
      add: false,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      placa: {
        title: 'Placa',
        type: 'string',
        filter: true
      },
      codigo: {
        title: 'Código',
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
        type: 'string',
        filter: true
      },
      saida: {
        title: 'Saída',
        type: 'string',
        filter: true
      },
    },
  };

  onSearch(query: string = '') {
    this.source.setFilter([
      // fields we want to include in the search
      {
        field: 'id',
        search: query
      },
      {
        field: 'Placa',
        search: query
      },
      {
        field: 'codigo',
        search: query
      },
      {
        field: 'tipo',
        search: query
      },
      {
        field: 'emailUsuario',
        search: query
      },
      {
        field: 'entrada',
        search: query
      },
      {
        field: 'saida',
        search: query
      }
    ], false);
    // second parameter specifying whether to perform 'AND' or 'OR' search 
    // (meaning all columns should contain search query or at least one)
    // 'AND' by default, so changing to 'OR' by setting false here
  }

  headRows() {
    return [
      { id: 'ID', placa: 'Placa', tipo: 'Tipo', email: 'E-mail', entrada: 'Entrada', saida: "Saída" },
    ]
  }

  downloadPDF() {
    const doc = new jsPDF()
    doc.autoTable({
      head: this.headRows(),
      body: this.dados,
    })
    doc.save('table.pdf')
  }
}