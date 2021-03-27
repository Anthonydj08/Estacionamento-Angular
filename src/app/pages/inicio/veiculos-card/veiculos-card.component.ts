import { Component, OnInit } from '@angular/core';
import { Veiculo } from '../../../@core/model/veiculo';
import { DbService } from '../../../@core/services/db.service';

@Component({
  selector: 'ngx-veiculos-card',
  templateUrl: './veiculos-card.component.html',
  styleUrls: ['./veiculos-card.component.scss']
})
export class VeiculosCardComponent implements OnInit {

  veiculos: Veiculo[];
  veiculoQuantidade : String;

  constructor(private dbService: DbService) { }

  ngOnInit() {
    this.loadVeiculos();
  }

  private async loadVeiculos() {
    await this.dbService.listWithUIDs<Veiculo>('/veiculo')
      .then(veiculos => {
        this.veiculoQuantidade = veiculos.length.toString();
      }).catch(error => {
        console.log(error);
      });
    }

}
