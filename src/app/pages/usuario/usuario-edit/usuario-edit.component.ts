import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../../@core/model/usuario';
import { DbService } from '../../../@core/services/db.service';
import { NbToastrService, NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  @Input() editUsuario: Usuario;

  constructor(private dbService: DbService, private toastrService: NbToastrService, protected ref: NbDialogRef<UsuarioEditComponent>) { }

  ngOnInit() {
    console.log(this.editUsuario);
    
  }
  edit(){
    const updatingObject = { nome: this.editUsuario.nome, cpf: this.editUsuario.cpf, email: this.editUsuario.email, identidade: this.editUsuario.identidade, matricula: this.editUsuario.matricula, telefone: this.editUsuario.telefone, tipo: this.editUsuario.tipo  };
    this.dbService.update('/pessoa', this.editUsuario.uid, updatingObject)
      .then(() => {
        this.showToast("Usuario editado com sucesso", "success");
        this.ref.close();
      }).catch(error => {
        console.log(error);
        this.showToast("Erro ao editar usuario", "danger")
      });
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }
  
  cancelar() {
    this.ref.close();
  }

}
