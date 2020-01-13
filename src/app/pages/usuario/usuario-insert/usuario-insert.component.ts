import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../@core/model/usuario';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { DbService } from '../../../@core/services/db.service';

@Component({
  selector: 'ngx-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.scss']
})
export class UsuarioInsertComponent implements OnInit {

  novoUsuario: Usuario;
  pessoas: Usuario[];

  constructor(private dbService: DbService, private toastrService: NbToastrService, protected ref: NbDialogRef<UsuarioInsertComponent>) { }

  ngOnInit() {
    this.novoUsuario = new Usuario();
  }

  insert() {
    if(!this.novoUsuario.nome){
      this.showToast("Erro ao cadastrar usuário", "danger");
    } else{
      this.dbService.insertInList<Usuario>('/pessoa', this.novoUsuario)
      .then(() => {
        this.novoUsuario;
        this.showToast("Usuario cadastrado com sucesso", "success");
        this.ref.close();
      }).catch(error => {
        console.log(error);
        this.showToast("Erro ao cadastrar usuário", "danger");
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
