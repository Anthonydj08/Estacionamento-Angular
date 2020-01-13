import { Component, OnInit } from '@angular/core';
import { VeiculoEditComponent } from '../veiculo-edit/veiculo-edit.component';
import { VeiculoInsertComponent } from '../veiculo-insert/veiculo-insert.component';
import { Router } from '@angular/router';
import { DbService } from '../../../@core/services/db.service';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { Veiculo } from '../../../@core/model/veiculo';

@Component({
  selector: 'ngx-veiculo-list',
  templateUrl: './veiculo-list.component.html',
  styleUrls: ['./veiculo-list.component.scss']
})
export class VeiculoListComponent implements OnInit {

  veiculos: Veiculo[];

  constructor(private dbService: DbService, public router: Router, private dialogService: NbDialogService, private toastrService: NbToastrService) {

  }
  ngOnInit() {
    this.loadVeiculos();
  }

  private async loadVeiculos() {
    await this.dbService.listWithUIDs<Veiculo>('/veiculo')
      .then(veiculos => {
        this.veiculos = veiculos;
      }).catch(error => {
        console.log(error);
      });
  }

  editar(veiculo) {
    this.dialogService.open(VeiculoEditComponent, {
      context: {
        editVeiculo: veiculo.data
      }
    });
  }

  remove(veiculo) {
    this.dbService.remove('/veiculo', veiculo.data.uid)
      .then(() => {
        this.showToast("Veículo removido", "warning");
        this.loadVeiculos();
      });
  }

  cadastrar(){
    this.dialogService.open(VeiculoInsertComponent)    
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
        title: 'Usuário',
        type: 'string',
      },
    },
   

  };
}
