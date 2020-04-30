import { Component, OnInit } from '@angular/core';
import { DbService } from '../../../../@core/services/db.service';
import { NbToastrService } from '@nebular/theme';
import { numVagas } from '../../../../@core/model/numVagas';

@Component({
  selector: 'ngx-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss']
})
export class ConfiguracoesComponent implements OnInit {

  novoNumVagas: numVagas;
  numVagas: numVagas[];

  constructor(private dbService: DbService, private toastrService: NbToastrService) {
  }

  async ngOnInit() {
    this.novoNumVagas = new numVagas();
    this.loadVagas()
    await this.loadVagas()
      .then(numVagas => {
        this.novoNumVagas.vagas = this.numVagas[0].vagas
      })
  }
  private async loadVagas() {
    await this.dbService.listWithUIDs<numVagas>('/numVagas')
      .then(numVagas => {
        this.numVagas = numVagas;
        console.log(numVagas);
      }).catch(error => {
        console.log(error);
      });
  }
  private async insert() {
    await this.loadVagas()
      .then(numVagas => {
        if (this.numVagas.length > 0) {
          console.log(this.numVagas);
          this.dbService.update('/numVagas', this.numVagas[0].uid, this.novoNumVagas);
          this.showToast("Número de vagas atualizado com sucesso", "success");
        } else {
          if (!this.novoNumVagas.vagas) {
            this.showToast("Erro ao cadastrar Número de vagas", "danger");
            console.log(this.novoNumVagas.vagas);
          } else {
            this.dbService.insertInList<numVagas>('/numVagas', this.novoNumVagas)
              .then(() => {
                this.novoNumVagas;
                this.showToast("Número de vagas cadastrado com sucesso", "success");
              }).catch(error => {
                console.log(error);
                this.showToast("Erro ao cadastrar Número de vagas", "danger");
              });
          }
        }
      })
  }

  showToast(mensagem, status) {
    this.toastrService.show(
      status || 'Success',
      mensagem,
      { status });
  }

}
