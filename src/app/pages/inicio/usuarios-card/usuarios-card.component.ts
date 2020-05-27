import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../@core/services/db.service';
import { Usuario } from '../../../@core/model/usuario';

@Component({
  selector: 'ngx-usuarios-card',
  templateUrl: './usuarios-card.component.html',
  styleUrls: ['./usuarios-card.component.scss']
})
export class UsuariosCardComponent implements OnInit {

  usuarios: Usuario[];
  usuarioQuantidade : String;

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.loadUsuarios();
  }

  private async loadUsuarios() {
    await this.dbService.listWithUIDs<Usuario>('/pessoa')
      .then(usuarios => {
        this.usuarios = usuarios;
        this.usuarioQuantidade = this.usuarios.length.toString();
      }).catch(error => {
        console.log(error);
      });
    }
}
