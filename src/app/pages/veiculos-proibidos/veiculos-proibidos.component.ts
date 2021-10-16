import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Veiculo } from '../../@core/model/veiculo';
import { DbService } from '../../@core/services/db.service';

@Component({
  selector: 'ngx-veiculos-proibidos',
  templateUrl: './veiculos-proibidos.component.html',
  styleUrls: ['./veiculos-proibidos.component.scss']
})
export class VeiculosProibidosComponent implements OnInit {

  veiculosProibidos: Veiculo[];

  constructor(private dbService: DbService, public router: Router, private dialogService: NbDialogService, private toastrService: NbToastrService) {

  }
  ngOnInit() {
    this.loadVeiculos();
  }

  private async loadVeiculos() {
    await this.dbService.listWithUIDs<Veiculo>('/veiculosProibidos')
      .then(veiculos => {
        this.veiculosProibidos = veiculos;
      }).catch(error => {
        console.log(error);
      });
  }

  remove(veiculo) {
    this.dbService.remove('/veiculosProibidos', veiculo.data.uid)
      .then(() => {
        this.showToast("Veículo removido da lista", "warning");
        this.loadVeiculos();
      });
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }

  settings = {
    mode:"external",

    actions: {
      columnTitle: ""
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
      modelo: {
        title: 'Modelo',
        type: 'string',
      },
      placa: {
        title: 'Placa',
        type: 'string',
      },
      cor: {
        title: 'Cor',
        type: 'string',
      },
      fabricante: {
        title: 'Fabricante',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
      usuarioEmail: {
        title: 'E-mail do proprietário',
        type: 'string',
      },
    },
   

  };
}
