import { Component, OnInit } from '@angular/core';
import { UsuarioEditComponent } from '../usuario-edit/usuario-edit.component';
import { Usuario } from '../../../@core/model/usuario';
import { DbService } from '../../../@core/services/db.service';
import { Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UsuarioInsertComponent } from '../usuario-insert/usuario-insert.component';

@Component({
  selector: 'ngx-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[];

  constructor(private dbService: DbService, public router: Router, private toastrService: NbToastrService, private dialogService: NbDialogService) {

  }
  ngOnInit() {
    this.loadPessoas();
  }

  private async loadPessoas() {
    await this.dbService.listWithUIDs<Usuario>('/pessoa')
      .then(usuarios => {
        this.usuarios = usuarios;
      }).catch(error => {
        console.log(error);
      });
  }

  editar(usuario) {
    this.dialogService.open(UsuarioEditComponent, {
      context: {
        editUsuario: usuario.data
      }
    });
  }

  cadastrar(){
    this.dialogService.open(UsuarioInsertComponent)    
  }

  remove(usuario) {
    this.dbService.remove('/pessoa', usuario.data.uid)
      .then(() => {
        this.showToast("Usuário removido", "warning");
        this.loadPessoas();
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
      matricula: {
        title: 'Matricula',
        type: 'string',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      telefone: {
        title: 'Telefone',
        type: 'string',
      },
      cpf: {
        title: 'CPF',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      tipo: {
        title: 'Tipo',
        type: 'string',
      },
    },
   

  };
}
