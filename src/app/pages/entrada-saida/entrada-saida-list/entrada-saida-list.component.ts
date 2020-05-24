import { Component, OnInit } from '@angular/core';
import { EntradaESaida } from '../../../@core/model/entradaESaida';
import { DbService } from '../../../@core/services/db.service';
import { Router } from '@angular/router';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { EntradaSaidaEntradaComponent } from '../entrada-saida-entrada/entrada-saida-entrada.component';

import jsPDF from 'jspdf'
import 'jspdf-autotable'

@Component({
  selector: 'ngx-entrada-saida-list',
  templateUrl: './entrada-saida-list.component.html',
  styleUrls: ['./entrada-saida-list.component.scss']
})
export class EntradaSaidaListComponent implements OnInit {

  entradaESaidas: EntradaESaida[];

  constructor(private dbService: DbService, public router: Router, private toastrService: NbToastrService, private dialogService: NbDialogService) {

  }
  ngOnInit() {
    this.loadEntradasEsaidas();
  }

  private async loadEntradasEsaidas() {
    await this.dbService.listWithUIDs<EntradaESaida>('/entradaesaida')
      .then(entradaESaidas => {
        this.entradaESaidas = entradaESaidas;
      }).catch(error => {
        console.log(error);
      });
  }

  // editar(usuario) {
  //   this.dialogService.open(EntradaSaidaSaidaComponent, {
  //     context: {
  //       editUsuario: usuario.data
  //     }
  //   });
  // }

  cadastrar() {
    this.dialogService.open(EntradaSaidaEntradaComponent)
  }

  // remove(usuario) {
  //   this.dbService.remove('/entradaESaida', usuario.data.uid)
  //     .then(() => {
  //       this.showToast("Entrada/Saida removida", "warning");
  //       this.loadEntradasEsaidas();
  //     });
  // }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }

  selecionado(event) {
    console.log(event.data);
    this.router.navigate(['/pages/entrada-saida/mostrar'], { queryParams: { value: JSON.stringify(event.data) } });
  }
  editar(event){
    this.selecionado(event);
  }
  remove(event){
    console.log(event);
    
    this.dbService.remove('/entradaesaida', event.data.uid)
    .then(() => {
      this.showToast('Entrada/Saida removida', 'warning');
      this.loadEntradasEsaidas();
    })
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
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      placa: {
        title: 'Placa',
        type: 'string',
      },
      codigo: {
        title: 'Código',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
      emailUsuario: {
        title: 'E-mail',
        type: 'string',
      },
      entrada: {
        title: 'Entrada',
        type: 'string',
      },
      saida: {
        title: 'Saída',
        type: 'string',
      },
    },


  };


  downloadPDF() {
    const doc = new jsPDF()
 
    doc.autoTable({
      head: [['Name', 'Email', 'Country']],
      body: [
        ['David', 'david@example.com', 'Sweden'],
        ['Castille', 'castille@example.com', 'Spain'],
      ],
    })
   
    doc.save('table.pdf')
  }
}
